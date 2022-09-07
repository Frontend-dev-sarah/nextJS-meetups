import { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meet up",
    image:
      "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg",
    address: "some city",
    description: "this is first meet up",
  },
  {
    id: "m2",
    title: "A second meet up",
    image:
      "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_960_720.jpg",
    address: "some cities",
    description: "this is 2nd meet up",
  },
];
const HomePage = (props) => {
  // const [meetups, setMeetups] = useState([]);
  // useEffect(() => {
  //   setMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Next Meetups</title>
        <meta name="description" content="List of active meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

//SSG => static side generation data fetching
export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:Iahw3Iz4pUqRWry7@cluster0.yxfwq.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetupsCollection");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    //revalidate: 3600, //update the page every one hour, to ensure having new data
    revalidate: 1, //update the page every one second, to ensure having new data
  };
};

//SSR => server side rendering => data fetching => for data that change very frequently, for exemple many time every seconds
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
