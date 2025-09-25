import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, Search, HelpCircle, Settings } from "lucide-react";

type ViewMode = "month" | "week" | "day";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getDaysArray = () => {
    const totalDays = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Adicionar dias vazios no início
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Adicionar os dias do mês
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const getWeekDays = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const changeWeek = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (increment * 7));
    setCurrentDate(newDate);
  };

  const changeDay = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + increment);
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded-md">
            Hoje
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (viewMode === "month") changeMonth(-1);
                else if (viewMode === "week") changeWeek(-1);
                else changeDay(-1);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => {
                if (viewMode === "month") changeMonth(1);
                else if (viewMode === "week") changeWeek(1);
                else changeDay(1);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h1 className="text-xl text-gray-800">
            {viewMode === "month" && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
            {viewMode === "week" && `Semana de ${formatDate(getWeekDays()[0])} até ${formatDate(getWeekDays()[6])}`}
            {viewMode === "day" && formatDate(currentDate)}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <select 
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as ViewMode)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">Mês</option>
            <option value="week">Semana</option>
            <option value="day">Dia</option>
          </select>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {viewMode === "month" && (
        <div className="flex-1">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {weekDays.map((day) => (
                  <th
                    key={day}
                    className="px-2 py-3 text-sm text-gray-500 font-normal border-b border-gray-200"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const days = getDaysArray();
                const rows = [];
                for (let i = 0; i < days.length; i += 7) {
                  rows.push(days.slice(i, i + 7));
                }
                return rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((day, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border border-gray-200 h-[120px] align-top ${
                          !day ? "bg-gray-50" : "hover:bg-gray-50"
                        }`}
                      >
                        {day && (
                          <div className="p-2">
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                                day === new Date().getDate() &&
                                currentDate.getMonth() === new Date().getMonth() &&
                                currentDate.getFullYear() === new Date().getFullYear()
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {day}
                            </span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "week" && (
        <div className="flex-1">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {weekDays.map((day, i) => (
                  <th key={day} className="border-b border-gray-200 p-2">
                    <div className="text-sm text-gray-500">{day}</div>
                    <div className={`mt-1 text-2xl ${
                      getWeekDays()[i].getDate() === new Date().getDate() &&
                      getWeekDays()[i].getMonth() === new Date().getMonth() &&
                      getWeekDays()[i].getFullYear() === new Date().getFullYear()
                        ? "text-blue-600 font-medium"
                        : "text-gray-900"
                    }`}>
                      {getWeekDays()[i].getDate()}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {getWeekDays().map((date, index) => (
                  <td
                    key={index}
                    className="border border-gray-200 h-[600px] align-top hover:bg-gray-50"
                  />
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "day" && (
        <div className="p-4">
          <table className="w-full border-collapse">
            <tbody>
              {Array.from({ length: 24 }, (_, i) => (
                <tr key={i} className="group">
                  <td className="w-20 pr-4 text-right align-top">
                    <span className="text-sm text-gray-500">
                      {i.toString().padStart(2, "0")}:00
                    </span>
                  </td>
                  <td className="border-t border-gray-200 h-14 group-hover:bg-gray-50" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Calendar;
