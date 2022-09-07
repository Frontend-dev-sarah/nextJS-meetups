import { Fragment } from "react";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Create a new meetup</title>
        <meta
          name="description"
          content="Add your daily meetups will easy your life!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
