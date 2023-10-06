import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoriesComponent from "@/landing-page/categoriesComponent";

describe("CategoriesComponent", () => {
   test("renders category select", async () => {
      render(<CategoriesComponent />);
      const categorySelect = screen.getByLabelText("Category");
      expect(categorySelect).toBeInTheDocument();
   });

   test("renders subcategory select", async () => {
      render(<CategoriesComponent />);
      const categorySelect = screen.getByLabelText("Category");
      fireEvent.change(categorySelect, { target: { value: "1" } });
      const subcategorySelect = screen.getByLabelText("Category");
      expect(subcategorySelect).toBeInTheDocument();
   });

   test("renders other input when other option is selected", async () => {
      render(<CategoriesComponent />);
      const categorySelect = screen.getByLabelText("Category");
      fireEvent.change(categorySelect, { target: { value: "1" } });
      const subcategorySelect = screen.getByLabelText("Category");
      fireEvent.change(subcategorySelect, { target: { value: "1" } });
      const otherOption = screen.getByText("Other");
      fireEvent.change(otherOption, { target: { value: "-1" } });
      const otherInput = screen.getByLabelText("Other");
      expect(otherInput).toBeInTheDocument();
   });
});
