import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import Addparticipantform from "@/components/addparticipantform";
import { useState, useEffect } from "react";
import Modal from "@/components/modal";
import { fetchParticipants, type Participant } from "@/services/api";
import ScheduleForm from "@/components/scheduleform";
import HealthRecordForm from "@/components/healthrecordform";

export const animals = [
  {
    label: "Cat",
    key: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    key: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    key: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", key: "lion", description: "The king of the jungle" },
  { label: "Tiger", key: "tiger", description: "The largest cat species" },
  { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    key: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    key: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    key: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    key: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    key: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

export default function IndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null
  );
  const [filterText, setFilterText] = useState("");
  const [scheduleModal, setScheduleModal] = useState<{
    isOpen: boolean;
    participantId: string;
    participantName: string;
  }>({
    isOpen: false,
    participantId: "",
    participantName: "",
  });

  // Add new state for health record modal
  const [healthModal, setHealthModal] = useState<{
    isOpen: boolean;
    participantId: string;
  }>({
    isOpen: false,
    participantId: "",
  });

  const loadParticipants = async () => {
    try {
      setIsLoading(true);
      const data = await fetchParticipants();
      setParticipants(data);
    } catch (error) {
      console.error("Failed to load participants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadParticipants();
  }, []);

  const handleParticipantAdded = () => {
    setIsModalOpen(false);
    loadParticipants();
  };

  const handleSchedule = (participant: Participant) => {
    setScheduleModal({
      isOpen: true,
      participantId: participant.id,
      participantName: participant.fullName,
    });
  };

  const handleScheduleSuccess = () => {
    setScheduleModal({ isOpen: false, participantId: "", participantName: "" });
    loadParticipants();
  };

  // Update the handleHealthRecord function
  const handleHealthRecord = (participantId: string) => {
    setHealthModal({
      isOpen: true,
      participantId,
    });
  };

  const handleHealthRecordSuccess = () => {
    setHealthModal({ isOpen: false, participantId: "" });
    loadParticipants();
  };

  // Filter participants for autocomplete with better formatting
  const searchOptions = participants.map((participant) => ({
    label: participant.fullName,
    key: participant.id,
    description: `${participant.age} years old • ${participant.gender}`,
    participant: participant,
  }));

  // Filter options based on input text
  const filteredOptions = searchOptions.filter((option) =>
    option.label.toLowerCase().includes(filterText.toLowerCase())
  );

  // Filter table data based on selection
  const displayedParticipants = selectedParticipant
    ? participants.filter((p) => p.id === selectedParticipant)
    : participants;

  const handleSelectionChange = (key: string) => {
    setSelectedParticipant(key);
  };

  const handleClearSelection = () => {
    setSelectedParticipant(null);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2">
            <Autocomplete
              className="min-w-[300px]"
              defaultItems={searchOptions}
              items={filteredOptions}
              label="Search Participants"
              placeholder="Search by name..."
              onSelectionChange={handleSelectionChange}
              onInputChange={setFilterText}
              selectedKey={selectedParticipant}
            >
              {(item) => (
                <AutocompleteItem key={item.key} className="py-2">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-small text-gray-500">
                      {item.description}
                    </span>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
            {selectedParticipant && (
              <Button size="sm" variant="light" onClick={handleClearSelection}>
                Clear Filter
              </Button>
            )}
          </div>
          <Button color="primary" onClick={() => setIsModalOpen(true)}>
            + Add Participants
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Participant"
        >
          <Addparticipantform onSuccess={handleParticipantAdded} />
        </Modal>

        <Modal
          isOpen={scheduleModal.isOpen}
          onClose={() =>
            setScheduleModal({
              isOpen: false,
              participantId: "",
              participantName: "",
            })
          }
          title="Schedule Appointment"
        >
          <ScheduleForm
            participantId={scheduleModal.participantId}
            participantName={scheduleModal.participantName}
            onSuccess={handleScheduleSuccess}
            onClose={() =>
              setScheduleModal({
                isOpen: false,
                participantId: "",
                participantName: "",
              })
            }
          />
        </Modal>

        {/* Add new Modal for health record */}
        <Modal
          isOpen={healthModal.isOpen}
          onClose={() => setHealthModal({ isOpen: false, participantId: "" })}
          title="Record Health Data"
        >
          <HealthRecordForm
            participantId={healthModal.participantId}
            onSuccess={handleHealthRecordSuccess}
            onClose={() => setHealthModal({ isOpen: false, participantId: "" })}
          />
        </Modal>

        <Table
          aria-label="Participants table"
          loadingContent={isLoading ? "Loading participants..." : undefined}
          loadingState={isLoading ? "loading" : "idle"}
        >
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>AGE</TableColumn>
            <TableColumn>GENDER</TableColumn>
            <TableColumn>SCHEDULE</TableColumn>
            <TableColumn>HEALTH DATA</TableColumn>
          </TableHeader>
          <TableBody>
            {displayedParticipants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.fullName}</TableCell>
                <TableCell>{participant.age}</TableCell>
                <TableCell>{participant.gender}</TableCell>
                <TableCell>
                  {participant.scheduledDate ? (
                    <span className="text-sm text-gray-600">
                      Scheduled:{" "}
                      {new Date(participant.scheduledDate).toLocaleDateString()}
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="flat"
                      onClick={() => handleSchedule(participant)}
                    >
                      Schedule
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    color="secondary"
                    onClick={() => handleHealthRecord(participant.id)}
                  >
                    Record Health Data
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </DefaultLayout>
  );
}
