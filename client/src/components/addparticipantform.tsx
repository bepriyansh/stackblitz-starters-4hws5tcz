import { useState } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { submitDemographicData } from "@/services/api";
import { Accordion, AccordionItem } from "@heroui/accordion";

const Addparticipantform = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    phone: "",
    email: "",
    employmentStatus: "",
    occupation: "",
    educationLevel: "",
    ethnicity: "",
    nationality: "",
    primaryLanguage: "",
    healthStatus: "",
    substanceUse: "",
    physicalActivityLevel: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitDemographicData(formData);
      onSuccess?.();
      // Optional: Add a success toast notification here
    } catch (error) {
      // Handle error
      console.error(error);
      // Optional: Add an error toast notification here
    }
  };

  const handleChange = (name: string, value: string) => {
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg bg-gray-50 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
            className="w-full"
          />
          <Input
            type="date"
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            required
            className="w-full"
          />
          <Select
            label="Gender"
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            required
            className="w-full"
          >
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-Binary</SelectItem>
          </Select>
          <Select
            label="Marital Status"
            value={formData.maritalStatus}
            onChange={(e) => handleChange("maritalStatus", e.target.value)}
            required
            className="w-full"
          >
            <SelectItem value="single">Single</SelectItem>
            <SelectItem value="married">Married</SelectItem>
            <SelectItem value="divorced">Divorced</SelectItem>
            <SelectItem value="widowed">Widowed</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </Select>
        </div>
      </div>

      <Accordion>
        <AccordionItem
          key="contact"
          title="Contact Information (Optional)"
          classNames={{
            base: "rounded-lg bg-gray-50",
            title: "text-lg font-semibold text-gray-900",
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
            <div className="sm:col-span-2">
              <Input
                label="Street Address"
                value={formData.address.street}
                onChange={(e) => handleChange("address.street", e.target.value)}
                className="w-full"
              />
            </div>
            <Input
              label="City"
              value={formData.address.city}
              onChange={(e) => handleChange("address.city", e.target.value)}
              className="w-full"
            />
            <Input
              label="State/Province"
              value={formData.address.state}
              onChange={(e) => handleChange("address.state", e.target.value)}
              className="w-full"
            />
            <Input
              label="ZIP/Postal Code"
              value={formData.address.zipCode}
              onChange={(e) => handleChange("address.zipCode", e.target.value)}
              className="w-full"
            />
            <Input
              label="Country"
              value={formData.address.country}
              onChange={(e) => handleChange("address.country", e.target.value)}
              className="w-full"
            />
          </div>
        </AccordionItem>
      </Accordion>

      <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white py-4">
        <Button type="button" variant="flat" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Addparticipantform;
