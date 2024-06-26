"use client";
import Loader from "@/components/Loader";
import UserCard from "@/components/cards/UserCard";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPeople = () => {
  const { query } = useParams();
const {user , isLoaded  } = useUser()
  const [loading, setLoading] = useState(true);
  const [searchedPeople, setSearchedPeople] = useState([]);

  const getSeachedPeople = async () => {
    const response = await fetch(`/api/user/search/${query}`);
    const data = await response.json();
    setSearchedPeople(data);
    setLoading(false);
  };

  useEffect(() => {
    getSeachedPeople();
  }, [query]);



  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6">
        <Link className={`tab bg-dark-2`} href={`/search/posts/${query}`}>
          Posts
        </Link>
        <Link className={`tab bg-purple-1`} href={`/search/people/${query}`}>
          People
        </Link>
      </div>

      {searchedPeople.map((person) => (
        <UserCard key={person._id} userData={person}/>
      ))}
    </div>
  );
};

export default SearchPeople;
