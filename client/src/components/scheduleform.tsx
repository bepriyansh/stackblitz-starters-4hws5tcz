import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

interface ScheduleFormProps {
  participantId: string;
  participantName: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const ScheduleForm = ({
  participantId,
  participantName,
  onSuccess,
  onClose,
}: ScheduleFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participantId,
          scheduledDateTime: `${formData.date}T${formData.time}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule");
      }

      onSuccess?.();
    } catch (error) {
      console.error("Scheduling error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Schedule appointment for {participantName}
        </p>
        <Input
          type="date"
          label="Date"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          required
          min={new Date().toISOString().split("T")[0]}
          className="w-full"
        />
        <Input
          type="time"
          label="Time"
          value={formData.time}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, time: e.target.value }))
          }
          required
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="flat" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" isLoading={isLoading}>
          Schedule
        </Button>
      </div>
    </form>
  );
};

export default ScheduleForm;
