using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineFreelancinPlatform.Migrations
{
    public partial class ModelsChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Orders_OrderID",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_OrderID",
                table: "OrderDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employees",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OrderID",
                table: "OrderDetails");

            migrationBuilder.RenameTable(
                name: "Employees",
                newName: "Employers");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "Orders",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "comment",
                table: "Orders",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "SellerUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                newName: "IX_Orders_SellerUserId");

            migrationBuilder.AddColumn<int>(
                name: "BuyerUserId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderDetailID",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "OrderDetails",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employers",
                table: "Employers",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_BuyerUserId",
                table: "Orders",
                column: "BuyerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderDetailID",
                table: "Orders",
                column: "OrderDetailID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderDetails_OrderDetailID",
                table: "Orders",
                column: "OrderDetailID",
                principalTable: "OrderDetails",
                principalColumn: "OrderDetailID",
                onDelete: ReferentialAction.Cascade);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderDetails_OrderDetailID",
                table: "Orders");

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
                name: "IX_Orders_OrderDetailID",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employers",
                table: "Employers");

            migrationBuilder.DropColumn(
                name: "BuyerUserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderDetailID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "OrderDetails");

            migrationBuilder.RenameTable(
                name: "Employers",
                newName: "Employees");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "Orders",
                newName: "rating");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Orders",
                newName: "comment");

            migrationBuilder.RenameColumn(
                name: "SellerUserId",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_SellerUserId",
                table: "Orders",
                newName: "IX_Orders_UserId");

            migrationBuilder.AddColumn<int>(
                name: "OrderID",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employees",
                table: "Employees",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_OrderID",
                table: "OrderDetails",
                column: "OrderID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Orders_OrderID",
                table: "OrderDetails",
                column: "OrderID",
                principalTable: "Orders",
                principalColumn: "OrderID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
