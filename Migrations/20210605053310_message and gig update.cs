using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineFreelancinPlatform.Migrations
{
    public partial class messageandgigupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SentAt",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "price",
                table: "Gigs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SentAt",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "price",
                table: "Gigs");
        }
    }
}
