"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { amenities, categories } from "@/lib/constants";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import type { IStudio } from "@/lib/types/studio";

// One form for both pages:
// <StudioForm />                  -> Add New Studio
// <StudioForm studio={studio} />  -> Update Studio
const StudioForm = ({ studio }: { studio?: IStudio }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: studio?.title ?? "",
    category: studio?.category ?? "",
    location: studio?.location ?? "",
    hourlyRate: studio ? String(studio.hourlyRate) : "",
    securityDeposit: studio ? String(studio.securityDeposit) : "",
    maxCapacity: studio ? String(studio.maxCapacity) : "",
    imageUrl: studio?.imageUrl ?? "",
    overview: studio?.overview ?? "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    studio?.amenities ?? [],
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const toggleAmenity = (amenity: string) =>
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );

  // Upload the chosen file to imgbb and put the link in the Image URL field
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        { method: "POST", body: formData },
      );
      const result = await res.json();

      if (!result.success) {
        toast.error("Image upload failed. Check your imgbb key.");
        return;
      }

      update("imageUrl", result.data.display_url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.category) {
      toast.error("Please choose a category");
      return;
    }
    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }

    setSaving(true);
    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        studio
          ? `${process.env.NEXT_PUBLIC_API_URL}/studio/${studio._id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/add-studio`,
        {
          method: studio ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...form, amenities: selectedAmenities }),
        },
      );
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.msg || "Could not save the studio");
        setSaving(false);
        return;
      }

      // the button stays busy until the listings page opens,
      // so a second click cannot save the studio twice
      toast.success(
        studio ? "Studio updated successfully" : "Studio added successfully",
      );
      router.push("/my-listings");
      router.refresh();
    } catch {
      toast.error("Could not reach the server. Please try again.");
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5">
        {/* Title */}
        <div className="grid gap-2">
          <Label htmlFor="title">Studio Title</Label>
          <Input
            id="title"
            placeholder="Northlight Cyc Studio"
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            required
          />
        </div>

        {/* Category + Location */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) => update("category", value ?? "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Photo Studio" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location / Address</Label>
            <Input
              id="location"
              placeholder="Greenpoint, Brooklyn"
              value={form.location}
              onChange={(event) => update("location", event.target.value)}
              required
            />
          </div>
        </div>

        {/* Rate + Deposit + Capacity */}
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              type="number"
              placeholder="e.g., 85"
              value={form.hourlyRate}
              onChange={(event) => update("hourlyRate", event.target.value)}
              required
              min="1"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
            <Input
              id="securityDeposit"
              type="number"
              placeholder="e.g., 200"
              value={form.securityDeposit}
              onChange={(event) =>
                update("securityDeposit", event.target.value)
              }
              required
              min="0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="maxCapacity">Max Capacity</Label>
            <Input
              id="maxCapacity"
              type="number"
              placeholder="e.g., 12"
              value={form.maxCapacity}
              onChange={(event) => update("maxCapacity", event.target.value)}
              required
              min="1"
            />
          </div>
        </div>

        {/* Image URL + imgbb upload */}
        <div className="grid gap-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://i.ibb.co/your-image.jpg"
              pattern="https://.*"
              title="The link must start with https://"
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
              required
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Paste an image link, or press Upload to send a photo to imgbb.
          </p>
        </div>

        {/* Amenities */}
        <div className="grid gap-2">
          <Label>Amenities</Label>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => {
              const selected = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted",
                  )}
                >
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview */}
        <div className="grid gap-2">
          <Label htmlFor="overview">Detailed Overview</Label>
          <Textarea
            id="overview"
            placeholder="Describe the space, the equipment and the house rules..."
            className="min-h-36"
            value={form.overview}
            onChange={(event) => update("overview", event.target.value)}
            required
          />
        </div>

        {/* Host (read-only) */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="hostName">Host Name</Label>
            <Input
              id="hostName"
              value={studio?.ownerName ?? user?.name ?? ""}
              readOnly
              className="bg-muted"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hostEmail">Host Email</Label>
            <Input
              id="hostEmail"
              value={studio?.ownerEmail ?? user?.email ?? ""}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/my-listings")}
        >
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={saving}>
          <Check />
          {saving ? "Saving..." : studio ? "Update Studio" : "Add Studio"}
        </Button>
      </div>
    </form>
  );
};

export default StudioForm;
