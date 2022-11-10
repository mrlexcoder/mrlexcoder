// import Head from "next/head";
import dynamic from "next/dynamic";
// import Link from "next/link";
import Fallback from "@/components/atom/Fallback/Fallback";
// import Navbar from "@/components/small-nav";
import Layout from "@/components/layout-dashboard";

import useUser from "@/lib/iron-session/useUser";
import { withIronSessionSsr } from "iron-session/next";
import {
  updateUserSessionSSR,
  updateUserSession,
} from "@/lib/iron-session/updateUserSession";
import { sessionOptions } from "@/lib/iron-session/session";
// import axios from "axios";
import { useEffect } from "react";
// import Meta from "@/components/meta";
// import { Cross1Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";

import MyPosts from "@/components/posts/myPosts";
// const axios = dynamic(() => import("axios"));
const LoginForm = dynamic(() => import("@/components/sign-in/LoginForm"));
// const LoginSide = dynamic(() => import("@/components/sign-in/LoginSide"));

export default function Index() {
  const { user } = useUser({
    // redirectTo: '/account',
    redirectIfFound: false,
  });

  const [isSignUp, setSignUp] = useState(true);

  const toggleSignIn = () => {
    setSignUp(!isSignUp);
  };

  useEffect(() => {
    if (user && !user.avatar) {
      // declare the data fetching function
      const fetchUserData = async () => {
        const res = await axios({
          method: "GET", // change this GET later
          url: process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        if (res.data) {
          await updateUserSession(res.data);
        }
      };
      // call the function
      fetchUserData()
        // make sure to catch any error
        .catch(console.error);
    }
  }, [user]);

  return (
    <>
      {/* <div className="h-full w-full">
        <div className="w-full h-full mx-auto  relative"> */}
      {!user && <Fallback />}

      {user && !user?.isLoggedIn ? (
        <Layout>
          <div className="w-full relative max-w-4xl p-4 mx-auto ">
            <div
              className="w-full bg-white shadow-sm p-8 rounded-lg flex justify-center mx-auto mt-8"
              style={{ maxWidth: 390 }}
            >
              <LoginForm isSignUp={isSignUp} />
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="text-sm text-gray-700">
              <span>
                {isSignUp
                  ? "Already got an account?"
                  : "Not got an account yet?"}
              </span>
              <a
                onClick={toggleSignIn}
                className="text-primary-400 cursor-pointer"
              >
                {isSignUp ? " Sign in." : " Sign up"}
              </a>
            </div>
          </div>
        </Layout>
      ) : (
        user &&
        user?.isLoggedIn && (
          <Layout navType={"simple"} background="#fff">
            <MyPosts />
          </Layout>
        )
      )}
      {/* </div>
      </div> */}
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  //iron-session user
  const user = req.session.user;

  if (user?.login?.jwt) {
    try {
      const res = await axios({
        method: "GET", // change this GET later
        url: process.env.NEXT_PUBLIC_API_URL + "/api/users/me",
        headers: {
          Authorization: `Bearer ${user.login.jwt}`,
        },
      });
      //update iron-session with this up to date data
      await updateUserSessionSSR(req, res);

      //then return it
      return {
        props: {
          userData: res.data,
          isConfirmed: res.data.confirmed,
        }, // will be passed to the page component as props
      };
    } catch (e) {
      console.log(e.message);
      return {
        props: {
          user: {
            isLoggedIn: false,
            login: "",
            avatarUrl: "",
            isConfirmed: false,
          },
        },
      };
    }
  }
  return {
    props: {},
  };
},
sessionOptions);