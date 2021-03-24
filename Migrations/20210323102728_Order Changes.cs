using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineFreelancinPlatform.Migrations
{
    public partial class OrderChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_BuyerUserId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_SellerUserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_BuyerUserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_SellerUserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "BuyerUserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "SellerUserId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "From",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "To",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "From",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "To",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "BuyerUserId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SellerUserId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BuyerUserId",
                table: "Orders",
                column: "BuyerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_SellerUserId",
                table: "Orders",
                column: "SellerUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_BuyerUserId",
                table: "Orders",
                column: "BuyerUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_SellerUserId",
                table: "Orders",
                column: "SellerUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
