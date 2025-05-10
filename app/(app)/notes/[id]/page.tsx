import MeetingDetailScreen from "@/components/screens/meeting-detail-screen"

export default function MeetingDetail({ params }: { params: { id: string } }) {
  return <MeetingDetailScreen id={params.id} />
}
