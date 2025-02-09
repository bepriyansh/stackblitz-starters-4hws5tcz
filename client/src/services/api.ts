export interface DemographicData {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    phone: string;
    email: string;
    employmentStatus: string;
    occupation: string;
    educationLevel: string;
    ethnicity: string;
    nationality: string;
    primaryLanguage: string;
    healthStatus?: string;
    substanceUse?: string;
    physicalActivityLevel?: string;
}

export const submitDemographicData = async (data: DemographicData) => {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/demographics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('Error submitting demographic data:', error);
        throw error;
    }
};

export interface Participant {
    id: string;
    fullName: string;
    age: number;
    gender: string;
    scheduledDate?: string; // Optional, will be present if already scheduled
}

// Demo data for development
export const DEMO_PARTICIPANTS: Participant[] = [
    {
        id: "1",
        fullName: "John Doe",
        age: 25,
        gender: "Male",
        scheduledDate: "2024-02-15"
    },
    {
        id: "2",
        fullName: "Jane Smith",
        age: 32,
        gender: "Female",
        scheduledDate: undefined
    },
    {
        id: "3",
        fullName: "Alex Johnson",
        age: 45,
        gender: "Non-Binary"
    },
    {
        id: "4",
        fullName: "Sarah Wilson",
        age: 28,
        gender: "Female",
        scheduledDate: "2024-02-20"
    },
    {
        id: "5",
        fullName: "Michael Brown",
        age: 35,
        gender: "Male"
    }
];

// Modify fetchParticipants to return demo data
export const fetchParticipants = async (): Promise<Participant[]> => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return DEMO_PARTICIPANTS;
};

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message?: string;
    token?: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export interface ScheduleRequest {
    participantId: string;
    scheduledDateTime: string;
}

export const scheduleParticipant = async (data: ScheduleRequest): Promise<void> => {
    const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to schedule participant');
    }
};
