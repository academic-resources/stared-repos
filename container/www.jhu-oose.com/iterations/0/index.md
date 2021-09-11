---
advisors:
  - name: Muskaan Kalra
    github: muskaankalra
  - name: Liza Mathews
    github: lizamathews
  - name: Shreyas Aiyar
    github: ShreyasAiyar
  - name: Anuraag Baishya
    github: anuraagbaishya
  - name: Pranav Shirke
    github: Pranavs05
  - name: Adeshola Lawal
    github: shola-lawal
  - name: Kalyani Bansidhar Pawar
    github: kpawar2410
---

# Iteration 0: Project Proposal

# Group Formation

Your first task in this iteration is to form a group of 5 or 6 students. You may form your group based on affinity if you already know people in the course, or you may form your group based on shared interests in theme and technology. An ideal group is motivated to work toward the same kinds of problems, but has a diverse background and expertise. A lot of what you learn in this course doesn’t come from the staff, but from the other members of your group.

You may form your group outside class time, or using the forum in the [Students Area](https://github.com/jhu-oose/{{site.course}}-students){:data-proofer-ignore="true"} <small title="You must be a registered student logged into GitHub to see this.">🔒</small>, or in person during [Laboratory Session 1](/group-projects#laboratory-sessions), which is dedicated to group formation.

After having formed a group, you must register it using the form below:

<form method="POST" action="https://roboose.herokuapp.com/roboose/groups">
<fieldset markdown="1">

<legend>Group Registration</legend>

<label>
**Group Identifier**  
<input type="text" name="identifier" required pattern="[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]">  
</label>
<small>
This must be a valid GitHub identifier: it may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.  
Don’t include an `@` sign at the beginning—this isn’t a [mention](https://help.github.com/en/articles/basic-writing-and-formatting-syntax#mentioning-people-and-teams).  
You may choose an identifier related to your project if you already decided on one; for example, if your project were [TODOOSE](https://github.com/jhu-oose/todoose) then your group identifier could be `todoose`. Or you may just choose a name for your group, for example, `power-oosers`.
</small>

<label>
**Group Members GitHub Identifiers**  
<input type="text" name="members[]" required pattern="[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]">  
</label>
<input type="text" name="members[]" required pattern="[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]">  
<input type="text" name="members[]" required pattern="[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]">  
<input type="text" name="members[]" pattern="[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]">  
<input type="text" name="members[]" pattern="[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]">  
<input type="text" name="members[]" placeholder="(Optional)" pattern="[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]">  
<small>
These must be the GitHub identifiers of [registered students](/assignments/0#onboarding), for example, [`jhu-oose-example-student`](https://github.com/jhu-oose-example-student).  
Don’t include an `@` sign at the beginning—this isn’t a [mention](https://help.github.com/en/articles/basic-writing-and-formatting-syntax#mentioning-people-and-teams).  
GitHub identifiers **do not** start with `2019-student-`.  
Groups must have 5 or 6 members.  
</small>

<label>
**Preferred [Advisors](/staff#group-advisors)**  
<select name="advisors[]">
<option value="">(Optional)</option>
{%- for advisor in page.advisors -%}
<option value="{{advisor.github}}">{{advisor.name}}</option>
{%- endfor -%}
</select>
</label>  
<select name="advisors[]">
<option value="">(Optional)</option>
{%- for advisor in page.advisors -%}
<option value="{{advisor.github}}">{{advisor.name}}</option>
{%- endfor -%}
</select>

**<small>⚠️</small>  Don’t submit this form multiple times. Your group must be registered by only one of your group members.**

<button>Register</button>

</fieldset>
</form>

If you run into problems, open an issue on your personal repository at `https://github.com/jhu-oose/{{site.course}}-student-<identifier>` or send an email to <group-registration@jhu-oose.com>. Include all the information from the form above.

After you register your group, the group members are invited to a GitHub Team called `jhu-oose/{{site.course}}-group-<identifier>`, which grants you access to a repository at `https://github.com/jhu-oose/{{site.course}}-group-<identifier>`. You’ll use this repository throughout the course to submit iterations, receive reviews, communicate with your advisor, and so forth.

Your group will be assigned a temporary advisor when you register your group, and by the end of [Iteration 1](/iterations/1) you’ll be assigned a permanent advisor.

## Initial Commit

By the end of this iteration, each group member must have authored at least one commit in the group’s repository, even if that commit is as simple as editing a line in the `README.md`.

# Project Proposal

<small>
Submit your project proposal as a [Markdown](/toolbox#authoring-language-markdown) document at `docs/project-proposal.md` in the `master` branch of your group’s repository at `https://github.com/jhu-oose/{{site.course}}-group-<identifier>`.
</small>

At this point your group may not have decided on a project, especially if your group was formed during [Laboratory Session 1](/group-projects#laboratory-sessions). In that case, you may submit not only one project proposal, but two or three of them. In [Iteration 1](/iterations/1) you’ll decide which proposal to develop with the help of your advisor.

Your group’s project proposal may simply be a more detailed version of a project proposal from one your group members’s [Assignment 0](/assignments/0#project-proposal).

## Title

If you already have a name for your project, then the title may be that name. If you don’t have a name for your project yet, then the title may be just a working title, for example, “Project GLaDOS.”

## Elevator Pitch

A brief description of what you’re proposing.

These are the two or three sentences you’d use to describe your project to your advisor if you only had 30 seconds, for example, “we’re building a web application that is a social network for weasel owners to schedule weasel play-dates—it’s like Tinder, but for weasels.”

## Problem

A more in-depth analysis of the problem your project is addressing.

For example, the description of the problem may start with: “Weasel owners are often ostracized by society because weasels are considered mean-spirited, so it’s difficult for them to arrange play-dates for their pets. But that’s a misconception: weasels are highly-social animals, […]”

**Introduction to Domain:** If you’re working in a domain that may be unknown to a broader audience, then you must include an introduction to that domain. For example, if you’re working with finances and the stock market, then you must explain what are ticks, Exchange-Traded Funds (ETFs), or whatever else may be relevant to your project. If you’re working in a domain that is known to a broader audience (for example, a shopping website), then you may simply say: “We’re working in a domain that is well understood by a broader audience.”

## Solution

A more in-depth analysis of how your project is solving the problem introduced above, including the following:

**Architecture Overview:** Are you building a web application, a mobile application, a desktop application, a software library, or something else entirely? Or are you combining a few of them (for example, if your project is a marketplace then you could be developing a web application for customers and a desktop application for service providers)?

Are you integrating with existing Application Programming Interfaces (APIs) (for example, [GitHub’s API](https://developer.github.com/v3/)), or sending and receiving emails as a primary feature in your application (not only for something nonessential like notifications, but for something more functional, for example, what happens in [Kill the Newsletter!](https://www.kill-the-newsletter.com)), and so forth?

If you’re using only the tools in the [Toolbox](/toolbox), then this section may simply be: “We’re using the tools in Toolbox.”

**Features:** A list of the _distinguishing_ features of your application.

Don’t include obvious features like “user signup,” “login,” “create/read/update/delete cars from inventory,” and so forth—keep the signal-to-noise ratio high. Think of the features list as something that would make sense to include in a marketing website; for example, see [GitHub’s features list](https://github.com/features).

**Wireframes:** Sketches of the _distinguishing_ parts of the user interface, including how information is laid out and what are the flows through the application.

Like in the Features List, don’t include wireframes for obvious features like “user signup,” “login,” and so forth.

Follow [the conventions for high-fidelity wireframes](https://www.usability.gov/how-to-and-tools/methods/wireframing.html). Use _real fake data_ instead of filler text ([_lorem ipsum_](https://en.wikipedia.org/wiki/Lorem_ipsum)).

If you’re proposing to build a software library that doesn’t include a visual component, replace wireframes with a sketch of the API that the library provides.

**User Stories:** An user story communicates a flow in the application that is difficult to express with a wireframe. This flow may involve more complex interactions with the application, or interactions outside the application, or the passing of time, and so forth.

An user story usually starts with something like: “As a \<kind-of-actor\>, I want to \<action\>, so that \<goal\>.” From there, the user story details _how_ the actor performs the action to achieve the goal, including what should happen when things go wrong.

For example, if the application is a blog, then an user story could start with: “As a comment moderator, I want to block users based on their region, so that their comments must be approved manually to reduce spam.” Then the user story would describe the steps to block users based on their region: drawing a region on a map, or providing a zip code, and so forth. The user story should also describe what should happen if the region is too big, or if the zip code doesn’t exist, and so forth.

Your project proposal must include at least one user story. If you don’t think that any feature in your application is complex enough to deserve an user story, then you probably need to scale the project up by adding more _distinguishing_ features.

## Viability

Determine whether the project you’re proposing is even possible. Consider the following:

**Hardware:** For example, of you’re building a mobile application, do all your group members have the necessary devices? Remember that to develop for iOS you also need a Mac.

Another example: If your project is related to the Internet of Things (IoT): Do all the group members have access to the devices? Can the devices do what you expect them to?

If you aren’t using special hardware, you may simply say: “Our project doesn’t depend on any special hardware.”

**APIs:** If you’re planing on consuming some API: Does it have the data that you need? Do you have access to it, or is it behind a paywall?

If you aren’t using any external APIs, you may simply say: “Our project doesn’t depend on any external APIs.”

**Tools:** If you need tools such as libraries and frameworks that aren’t in the [Toolbox](/toolbox): Do you have access to them, or are they paid? Can they do what you expect them to?

This is particularly important if your project depends heavily on third-party libraries, for example, if you’re working in the domain of computer vision, natural language processing, machine learning, and so forth.

If you aren’t using tools outside the Toolbox, you may simply say: “Our project is using only tools in the Toolbox.”

**Proof of Concept:** If some of the above isn’t clear, build a quick proof of concept.

For example, download and install the computer vision library you intend to use and show that it can find a face, or whatever else you may need for your project.

If it’s clear that the project is viable (for example, if you’re using only the tools in the [Toolbox](/toolbox)), then you may simply say: “It’s clear that our project is technically viable because \_\_\_.”

## Difficulty

Determine whether the project you’re proposing is at the right scale.

This is subjective and difficult to estimate, so you must talk to the staff about it. At the bare minimum your project must include one _non-data-manipulation_ feature; ideally it includes several.

A counterexample of this is [TODOOSE](https://github.com/jhu-oose/todoose). TODOOSE is a pedagogical application meant to introduce you to the [Toolbox](/toolbox), so all its features are data manipulation. Your project must go beyond this, including something you couldn’t do with a simple spreadsheet shared on the web. It must include some unique and interesting logic, instead of just gluing tools together.

But at the same time, your project must be completed during the course by 5 or 6 students who have other responsibilities in life.

It’s always possible to scale a project up or down by adding or removing features.

When scaling a project up, avoid vague features. For example, if you’re building a bulletin-board to post university-related events, you may propose a nontrivial feature such as “a recommendation system for events based on your interests.” Features like these are hard to pin down. Prefer something more concrete, for example, create a marketplace for event promoters to advertise in the media, which would require managing transactions, having different subsystems for event promoters and media representatives, and so forth.

See some [project examples](/group-projects#examples) to help you gauge the scale of project suitable for the course.

## Market Research

**Users:** What problems do your users have that will bring them to your application? How knowledgeable are they on technology and on the domain of your application? How much do you know about them? How much access do you have to them (for example, if you’re proposing to develop an application for blind people, it would help to be in touch with a blind person)?

**Competition:** What applications are similar to yours? How is your application different?

You don’t have to come up with a completely original project, but you may not just recreate an existing application either.

## Roadmap

<small>
Submit the roadmap as a [GitHub Project Board](https://help.github.com/en/articles/about-project-boards).
</small>

How do you plan on executing the project? Which features are the most important and must be addressed first? Which features may only be addressed after other features are complete? Which other tasks must be completed in order to support feature development (for example, requesting access to an external API on which your project may depend)?

Start the project board with one column for each iteration and add tasks as notes on the corresponding iteration. See the [Project Board for TODOOSE](https://github.com/jhu-oose/todoose/projects/3) for a small example.

Read the pages for [Iterations 1–6](/#group-projects) to understand what you must accomplish by when, and break your project apart in tasks: more detailed tasks for the next few iterations, and more vague tasks for the later ones. Tasks must be small enough so that they are completable in one iteration, but big enough not to clutter the roadmap.

As you work on your project throughout the course, you must update this project board to keep track of your progress, following the [GitHub Flow](https://guides.github.com/introduction/flow/). When you start working on a task, convert its corresponding note into a [GitHub Issue](https://help.github.com/en/articles/about-issues), assign the issue to the responsible group members, and break the task down in smaller steps. When finished working on a task, associate it with a [GitHub Pull Request](https://help.github.com/en/articles/about-pull-requests), merge it, and close the issue. Add more details to the tasks for the next iterations and move notes around to other iterations as needed.

## Template

Parts marked with `<!-- -->` are placeholders that you must fill in.

```
# <!-- Title -->

# Elevator Pitch

<!-- TODO -->

# Problem

<!-- TODO -->

## Introduction to Domain

<!-- TODO -->

# Solution

<!-- TODO -->

## Architecture Overview

<!-- TODO -->

## Features

- <!-- TO -->
- <!-- DO -->

## Wireframes

**<!-- Description, for example, “Events Map” -->**

![](<!-- TODO -->)

## User Stories

<!-- TODO -->

# Viability

## Hardware

<!-- TODO -->

## APIs

<!-- TODO -->

## Tools

<!-- TODO -->

## Proof of Concept

<!-- TODO -->

# Difficulty

<!-- TODO -->

# Market Research

## Users

<!-- TODO -->

## Competition

<!-- TODO -->

# Roadmap

https://github.com/jhu-oose/<!-- TODO -->/projects/<!-- TODO -->
```
