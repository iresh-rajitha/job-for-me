﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OnlineFreelancinPlatform.Data;

namespace OnlineFreelancinPlatform.Migrations
{
    [DbContext(typeof(FreelancingDBContext))]
    [Migration("20210320134042_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.Admin", b =>
                {
                    b.Property<int>("AdminID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("AdminName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AdminID");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.Field", b =>
                {
                    b.Property<int>("FieldID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FieldName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("FieldID");

                    b.ToTable("Fields");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.Message", b =>
                {
                    b.Property<int>("MessageID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("AdminID")
                        .HasColumnType("int");

                    b.Property<int>("From")
                        .HasColumnType("int");

                    b.Property<bool>("IsRead")
                        .HasColumnType("bit");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("To")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("MessageID");

                    b.HasIndex("AdminID");

                    b.HasIndex("UserId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.Order", b =>
                {
                    b.Property<int>("OrderID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("AdminID")
                        .HasColumnType("int");

                    b.Property<int?>("BuyerUserId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrderDetailID")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int?>("SellerUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("OrderID");

                    b.HasIndex("AdminID");

                    b.HasIndex("BuyerUserId");

                    b.HasIndex("OrderDetailID")
                        .IsUnique();

                    b.HasIndex("SellerUserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.OrderDetail", b =>
                {
                    b.Property<int>("OrderDetailID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("OrderDetailID");

                    b.ToTable("OrderDetails");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.Message", b =>
                {
                    b.HasOne("OnlineFreelancinPlatform.Model.Admin", "Admin")
                        .WithMany("Messages")
                        .HasForeignKey("AdminID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineFreelancinPlatform.Model.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Admin");

                    b.Navigation("User");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.Order", b =>
                {
                    b.HasOne("OnlineFreelancinPlatform.Model.Admin", null)
                        .WithMany("Orders")
                        .HasForeignKey("AdminID");

                    b.HasOne("OnlineFreelancinPlatform.Model.User", "Buyer")
                        .WithMany()
                        .HasForeignKey("BuyerUserId");

                    b.HasOne("OnlineFreelancinPlatform.Model.OrderDetail", "OrderDetail")
                        .WithOne("Order")
                        .HasForeignKey("OnlineFreelancinPlatform.Model.Order", "OrderDetailID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OnlineFreelancinPlatform.Model.User", "Seller")
                        .WithMany()
                        .HasForeignKey("SellerUserId");

                    b.Navigation("Buyer");

                    b.Navigation("OrderDetail");

                    b.Navigation("Seller");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.Admin", b =>
                {
                    b.Navigation("Messages");

                    b.Navigation("Orders");
                });

            modelBuilder.Entity("OnlineFreelancinPlatform.Model.OrderDetail", b =>
                {
                    b.Navigation("Order");
                });
#pragma warning restore 612, 618
        }
    }
}
