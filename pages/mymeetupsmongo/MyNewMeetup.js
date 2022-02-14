import { useRouter } from "next/router";

import NewMeetupForm from "../../components/mymeetupsmongo/MyNewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  function addMeetupHandler(meetupData) {
    fetch(
      "https://nextjs-course-20fa0-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      router.push({
        pathname: "/",
      });
    });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
