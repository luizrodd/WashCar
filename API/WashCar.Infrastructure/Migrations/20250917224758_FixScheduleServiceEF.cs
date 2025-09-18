using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WashCar.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixScheduleServiceEF : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices");

            migrationBuilder.AddColumn<Guid>(
                name: "ScheduleId",
                table: "ScheduleServices",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleServices_ScheduleId",
                table: "ScheduleServices",
                column: "ScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices");

            migrationBuilder.DropIndex(
                name: "IX_ScheduleServices_ScheduleId",
                table: "ScheduleServices");

            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "ScheduleServices");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleService_Schedule",
                table: "ScheduleServices",
                column: "Id",
                principalTable: "Schedules",
                principalColumn: "Id");
        }
    }
}
