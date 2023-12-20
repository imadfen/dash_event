import { Participant } from "../types/Pariticipant";

type PropsType = {
  participants: Participant[];
};

export default function AdminParticipantsTab({ participants }: PropsType) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-primary text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left font-extrabold">First Name</th>
            <th className="py-3 px-6 text-left font-extrabold">Last Name</th>
            <th className="py-3 px-6 text-left font-extrabold">Email</th>
            <th className="py-3 px-6 text-left font-extrabold">Phone</th>
            <th className="py-3 px-6 text-left font-extrabold">Is Student</th>
            <th className="py-3 px-6 text-left font-extrabold">University</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {participants.map((part, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {part.firstName}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {part.lastName}
              </td>
              <td className="py-3 px-6 text-left">{part.email}</td>
              <td className="py-3 px-6 text-left">{part.phone}</td>
              <td className="py-3 px-6 text-left">
                {part.isStudent ? "Yes" : "No"}
              </td>
              <td className="py-3 px-6 text-left">{part.university || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
