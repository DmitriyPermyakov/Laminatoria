﻿// <auto-generated />
using System;
using Laminatoria.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Laminatoria.Migrations
{
    [DbContext(typeof(LaminatoriaDbContext))]
    partial class LaminatoriaDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Laminatoria.Models.AdditionalProperty", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<string>("Values")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.ToTable("AdditionalProperties");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Ширина",
                            ProductId = 1,
                            Values = "2 3.5 4"
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.Category", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = (short)1,
                            Name = "laminate",
                            Value = "Ламинат"
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.Contact", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("OrderId")
                        .IsUnique();

                    b.ToTable("Contact");

                    b.HasData(
                        new
                        {
                            Id = (short)1,
                            Email = "andrey@mail.ru",
                            Name = "Андрей Иванов",
                            OrderId = 1,
                            Phone = "+79994442233"
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Comments")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Delivery")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<decimal>("Summary")
                        .HasColumnType("decimal(65,30)");

                    b.HasKey("Id");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "ул. Новосибирская 23, кв 45",
                            Comments = "slgksag;saj;sf",
                            Date = new DateTime(2024, 3, 11, 19, 13, 30, 274, DateTimeKind.Local).AddTicks(1024),
                            Delivery = "delivery",
                            Status = 0,
                            Summary = 1500m
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("AdditionalPropValue")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<float>("Amount")
                        .HasColumnType("float");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderItem");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AdditionalPropValue = "2.5",
                            Amount = 8f,
                            OrderId = 1,
                            ProductId = 1
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<short?>("CategoryId")
                        .HasColumnType("smallint");

                    b.Property<string>("Images")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(9,2)");

                    b.Property<byte>("TypeOfMeasurement")
                        .HasColumnType("tinyint unsigned");

                    b.Property<byte>("TypeOfProduct")
                        .HasColumnType("tinyint unsigned");

                    b.Property<string>("Vendor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryId = (short)1,
                            Images = "",
                            Name = "Дуб Ривьера",
                            Price = 900m,
                            TypeOfMeasurement = (byte)0,
                            TypeOfProduct = (byte)0,
                            Vendor = "12 2354 zz"
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.Properties", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<string>("Property")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("Properties");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ProductId = 1,
                            Property = "Бренд",
                            Value = "Дуб ривьера"
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.RefreshToken", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<short>("UserId")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("Laminatoria.Models.User", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = (short)1,
                            Email = "test@mail.ru",
                            PasswordHash = "$2a$12$MXljV674yDVMbnT7EHwzZe7PIvs/N2aLld.dA9/B1wTNLj.Pu9Pyu"
                        });
                });

            modelBuilder.Entity("Laminatoria.Models.AdditionalProperty", b =>
                {
                    b.HasOne("Laminatoria.Models.Product", "Product")
                        .WithOne("AdditionalProperty")
                        .HasForeignKey("Laminatoria.Models.AdditionalProperty", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Laminatoria.Models.Contact", b =>
                {
                    b.HasOne("Laminatoria.Models.Order", "Order")
                        .WithOne("Contacts")
                        .HasForeignKey("Laminatoria.Models.Contact", "OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");
                });

            modelBuilder.Entity("Laminatoria.Models.OrderItem", b =>
                {
                    b.HasOne("Laminatoria.Models.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Laminatoria.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Laminatoria.Models.Product", b =>
                {
                    b.HasOne("Laminatoria.Models.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Laminatoria.Models.Properties", b =>
                {
                    b.HasOne("Laminatoria.Models.Product", "Product")
                        .WithMany("Properties")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Laminatoria.Models.RefreshToken", b =>
                {
                    b.HasOne("Laminatoria.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Laminatoria.Models.Category", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("Laminatoria.Models.Order", b =>
                {
                    b.Navigation("Contacts");

                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("Laminatoria.Models.Product", b =>
                {
                    b.Navigation("AdditionalProperty")
                        .IsRequired();

                    b.Navigation("Properties");
                });
#pragma warning restore 612, 618
        }
    }
}
