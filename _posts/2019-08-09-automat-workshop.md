---
layout: post
title:  "Automat workshop mode - simpler, more flexible CPaaS consumption"
excerpt_separator: <!--more-->
---

This post is an initial introduction of the Automat Berlin **//workshop** setup. We will explain our approach to a more straightforward and more flexible consumption of various Communications Platform as a Service (CPaaS) providers and how we would like to improve developers choices conceptually. We explain our flexible adapter concept, and as a first practical example, we introduce the programming tool [Node-RED](https://nodered.org). We will show how we believe it may help to reduce the barrier for non-programmers to get started building applications on top of CPaaS infrastructures.

<!--more-->

### Automat Berlin //workshop

Automat Berlin started off introducing two work modes:
- *//factory* where we focus on full-stack application development for our customers. We can quickly scale our team together with our long-term reliable partners.
- *//workshop* where we focus on building software for communications applications and services in particular. We're happy about challenges with significant synergies in this area, and also regularly release open-source software supporting both developers and end-users in creating communications experiences.

One of the aims of our //workshop mode is to help develop the missing glue to support developers of communication applications. According to our experience in previous projects, it is still not trivial to consume communications services and the level of abstraction various quite a bit between providers. Especially for developers without a prior background of integrating communication services or features into their applications, hidden challenges exist (e.g., mapping APN/GCM with the communications backend or synchronization of data and states between multiple devices).
We want to bridge this gap and free developers from the need of particular early choices with regards to their communications service provider. Whether it is for convenience, cost, reach, or simplicity - choices for "the right" CPaaS provider, are as manifold as they are differing. Moreover, we want to supplement the "bare" CPaaS features with components that we found useful over the years and that are lacking with most offerings.
It is essential to understand that the //workshop concept does not aim at becoming yet another CPaaS provider. We instead want to simplify the interactions of developers with existing CPaaS providers.
For us, this means:

- Freedom of choice without lock-in
- Reach & cost-aware selection of a CPaaS provider (with a pre-integrated list to start with)
- Openness of both our approach (open to contributions) as well as software stack (which is open-source)
- Lower barrier to getting started consuming CPaaS overall

This approach allows for CPaaS independent development without drawbacks. Since our software is open-source, there is also no lock-in with us.

The extension with CPaaS independent features follows two approaches:

- Solution elements directly provided by Automat Berlin
- Integration interfaces for third-party services

When we believe for elements to be essential and consider our experience relevant, we will extend our open-source stack and implement mechanisms ourself. This extension will most likely only be the case for a very focused set that is directly useful for communications applications themselves or appears to a developer as a small helper.

For every supplementary function of CPaaS features that has the potential to be or exists already as a separate service, we will provide interfaces for easy integration. That way, you do not need to trust us to provide the best text-to-speech engine for example (which we won't) or believe that a particular pre-integrated partner is the best choice for your language. You are able to connect any third party or even your own service.

In the following section, we will explain our adapter approach from a technical point of view.


### //workshop in practice

#### //a flexible adapter concept

From a high-level perspective, our software stack looks as follows on both client and server-side:

![Automat Berlin Client/Server Stack Approach](/images/workshop-concept.svg "Automat Berlin Client/Server Stack Approach")

- The client-side SDKs permit an easy switch of the communications stack when integrating with the Automat SDK thin integration layer. An applied sample of this is our first open-source release [//afone](https://automat.berlin/2019/07/11/afone-ios/).
- As server-side functions, we also offer the feature to consume CPaaS services as well as process their respective responses. Input/Output is normalized and accessible for further processing.

It follows the same concept on the API and SDK, i.e., to act as an adapter between a generically exposed interface and the specific services.

![Automat Berlin Adapter](/images/workshop-conversion.svg "Automat Berlin Adapter")

It works with a single or multiple underlying providers and the logic when to chose which provider can either be controlled by the developer, so some external algorithm (e.g., a Least Cost Routing (LCR) function). Functions from various CPaaS providers can also be mixed when integrating with the adapter. In the future, we also plan to integrate relevant open-source software to expose the Automat API also for platforms that are currently not able to provide classic CPaaS APIs (e.g., Kamailio, Asterisk).

![CPaaS Aggregation](/images/workshop-adapter.svg "CPaaS Aggregation")

All of these efforts should lead to more transparency in the CPaaS market and more options and more flexibility to their consumers. It all contributes to our goal to more freedom, flexibility, and openness. It is however still focused on developers, i.e., programmers of applications, directly.

Besides supporting those, one of our aims is lowering the barrier for *everyone*. We believe in achieving this by reducing the complexity of said APIs and also not requiring to consume them in a technical way altogether.

The following section explains how we extended Node-RED, an open-source software tool that provides a GUI (Graphical User Interface), as universal API for CPaaS providers that do not offer it themselves yet or only a limited version respectively.

#### //a Node-RED extensions

According to their website, Node-RED is "a programming tool for wiring together hardware devices, APIs, and online services in new and interesting ways." It enables the easy connection of functional nodes for mapping complex workflows. It comes with a base set of functions and has a broad "Palette" with many contributed modules.

We found that one of the main obstacles of getting started in developing enhanced applications on top of CPaaS APIs is for non-developers to manage the still existing complexity of the API flows.

The main complexity drivers (especially also for non-developers) are:
- Knowledge of a programming language to script the interaction with the API
- Understanding of the concept of concatenated webhooks
- No single service to provide all required functions (e.g., database lookup, timer, text/speech conversion)

We will make modules as well as workflows available in the future that make use of Node-RED and should remove all obstacles mentioned above for even non-developers to get started with CPaaS application development.

In our next blog post, you will learn more about the first [open-source module](https://github.com/automat-berlin/node-red-contrib-sipgate) we have developed on top of the [sipgate.io](https://www.sipgate.io) Application Programming Interface (API) that [Sipgate](https://www.sipgate.de/wir-sind-sipgate) offers to any of their customers.
