import React from "react";
import TopicTopItem from './TopicTopItem'
import TopicItem from "./TopicItem"
export default function TopicList({currentTopics = []}) {
    const heroTopics = currentTopics.length ? currentTopics.slice(0,2) :[]
    const moreTopics = currentTopics.length ? currentTopics.slice(2) : []

    return (
        <section className="mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {
                heroTopics.length ? heroTopics.map((item, index) => {
                    return <TopicTopItem key={`topic_${index}`} topic={item?.attributes} />
                }): null
            }
            {
                moreTopics.length ? moreTopics.map((item, index) => {
                    return <TopicItem key={`topic_${index}`} topic={item?.attributes} />
                }): null
            }
        </section>
    )
}