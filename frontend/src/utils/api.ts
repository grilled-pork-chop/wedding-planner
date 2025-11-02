import type { FormData } from "@/types";

/**
 * Submit invitation form to backend
 * TODO: Replace with your actual API endpoint
 */
// export async function submitInvitation(data: FormData): Promise<void> {
//   const response = await fetch("/api/invitations", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to submit invitation");
//   }

//   return response.json();
// }

export async function submitInvitation(data: FormData): Promise<any> {
  console.log("Mock submitInvitation called with:", data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Invitation submitted successfully (mock)",
  };
}