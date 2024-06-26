import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { ISbStoryData } from "@storyblok/js";

// [Start] Define dynamic components (Part 1)
import StoryblokComponent from "~/components/storyblok/component";
// [End]

// [Start] Storyblok Initial Setup
import { storyblokApi, useStoryblok } from "~/routes/plugin@storyblok";

export const useStory = routeLoader$(async () => {
  if (!storyblokApi)
    throw new Error("Not Storyblok plugin found to make the API calls");

  const { data } = await storyblokApi.get("cdn/stories/home", {
    version: "draft",
  });
  return data.story as ISbStoryData;
});
// [End]

export default component$(() => {
  const story = useStoryblok(useStory().value);

  return <StoryblokComponent key={story.value.id} blok={story.value.content} />;
});

export const head: DocumentHead = {
  title: "Welcome to Qwik with Storyblok",
  meta: [
    {
      name: "description",
      content: "Qwik & Storyblok site description",
    },
  ],
};
