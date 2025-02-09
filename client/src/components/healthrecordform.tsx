import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

interface HealthData {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  respiratoryRate: number;
  temperature: number;
  oxygenSaturation: number;
  weight: number;
  height: number;
  ecgNotes: string;
  bloodGlucose: number;
  urineOutput: number;
}

interface HealthRecordFormProps {
  participantId: string;
  onSuccess: () => void;
  onClose: () => void;
}

const initialHealthData: HealthData = {
  heartRate: 0,
  bloodPressure: { systolic: 0, diastolic: 0 },
  respiratoryRate: 0,
  temperature: 0,
  oxygenSaturation: 0,
  weight: 0,
  height: 0,
  ecgNotes: "",
  bloodGlucose: 0,
  urineOutput: 0,
};

export default function HealthRecordForm({
  participantId,
  onSuccess,
  onClose,
}: HealthRecordFormProps) {
  const [formData, setFormData] = useState<HealthData>(initialHealthData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/participants/health/${participantId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: formData }),
        }
      );

      if (!response.ok) throw new Error("Failed to save health record");

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Heart Rate (bpm)"
          type="number"
          value={formData.heartRate}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              heartRate: Number(e.target.value),
            }))
          }
          helperText="Normal: 60-100 bpm"
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Blood Pressure (mmHg)
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Systolic"
              type="number"
              value={formData.bloodPressure.systolic}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bloodPressure: {
                    ...prev.bloodPressure,
                    systolic: Number(e.target.value),
                  },
                }))
              }
              required
            />
            <Input
              placeholder="Diastolic"
              type="number"
              value={formData.bloodPressure.diastolic}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bloodPressure: {
                    ...prev.bloodPressure,
                    diastolic: Number(e.target.value),
                  },
                }))
              }
              required
            />
          </div>
          <p className="text-sm text-gray-500">Normal: &lt;120/80 mmHg</p>
        </div>

        <Input
          label="Respiratory Rate (breaths/min)"
          type="number"
          value={formData.respiratoryRate}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              respiratoryRate: Number(e.target.value),
            }))
          }
          helperText="Normal: 12-20 breaths/min"
          required
        />

        <Input
          label="Temperature (°F)"
          type="number"
          step="0.1"
          value={formData.temperature}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              temperature: Number(e.target.value),
            }))
          }
          helperText="Normal: 97°F-99°F"
          required
        />

        <Input
          label="Oxygen Saturation (%)"
          type="number"
          value={formData.oxygenSaturation}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              oxygenSaturation: Number(e.target.value),
            }))
          }
          helperText="Normal: 95%-100%"
          required
        />

        <Input
          label="Weight (kg)"
          type="number"
          step="0.1"
          value={formData.weight}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, weight: Number(e.target.value) }))
          }
          required
        />

        <Input
          label="Height (cm)"
          type="number"
          value={formData.height}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, height: Number(e.target.value) }))
          }
          required
        />

        <Input
          label="Blood Glucose (mg/dL)"
          type="number"
          value={formData.bloodGlucose}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              bloodGlucose: Number(e.target.value),
            }))
          }
          helperText="Normal (fasting): 70-99 mg/dL"
          required
        />

        <Input
          label="Urine Output (mL/day)"
          type="number"
          value={formData.urineOutput}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              urineOutput: Number(e.target.value),
            }))
          }
          helperText="Normal: 800-2000 mL/day"
          required
        />

        <div className="col-span-2">
          <Input
            label="ECG Notes"
            type="text"
            value={formData.ecgNotes}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ecgNotes: e.target.value }))
            }
            placeholder="Enter ECG observations"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="flat" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" isLoading={isLoading}>
          {isLoading ? "Saving..." : "Save Health Record"}
        </Button>
      </div>
    </form>
  );
}
