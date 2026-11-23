import Form from "next/form";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/constants";

// Submitting this form opens /studios?search=...&category=...
export function StudioFilters({
  category,
  search,
}: {
  category: string;
  search: string;
}) {
  return (
    <Form
      action="/studios"
      className="mt-8 grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[1fr_220px_auto]"
    >
      <Input
        name="search"
        defaultValue={search}
        placeholder="Search by title or location"
        aria-label="Search studios"
        className="h-9"
      />
      <select
        name="category"
        defaultValue={category}
        aria-label="Category"
        className="h-9 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">All Categories</option>
        {categories.map((item) => (
          <option key={item.value} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
      <Button type="submit" size="lg">
        <Search />
        Search
      </Button>
    </Form>
  );
}
