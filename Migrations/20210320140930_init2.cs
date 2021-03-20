using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineFreelancinPlatform.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Admins_AdminID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_AdminID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AdminID",
                table: "Orders");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdminID",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AdminID",
                table: "Orders",
                column: "AdminID");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Admins_AdminID",
                table: "Orders",
                column: "AdminID",
                principalTable: "Admins",
                principalColumn: "AdminID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
