using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WashCar.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixServiceEF : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices",
                column: "Id",
                principalTable: "Schedules",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices",
                column: "ServiceId",
                principalTable: "Schedules",
                principalColumn: "Id");
        }
    }
}
