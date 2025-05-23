import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERIES } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params = {search:query || null};

  const session = await auth();

  console.log(session?.id);
  
  const {data:posts}=await sanityFetch({query:STARTUPS_QUERIES,params});

  console.log(JSON.stringify(posts,null,2));
  
  // const posts = [{
  //   _createdAt:new Date(),
  //   views:55,
  //   author:{_id:1,name:"Ashley"},
  //   _id:1,
  //   description:'This is a description.',
  //   image:"https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   category:"Robots",
  //   title:"We Robots"
  // }]
  return (
    <>
      <section className="pink_container">

        <h1 className="heading">Pitch Your Startup, <br /> Connect with Enterpreneurs</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((posts:StartupTypeCard,index:number) => (
              <StartupCard key={posts?._id} post={posts}/>
            ))
          )  : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
