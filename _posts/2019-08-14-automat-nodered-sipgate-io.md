---
layout: post
title:  "A Graphical User Interface (GUI) for sipgate.io as Node-RED module"
excerpt_separator: <!--more-->
---

In this post, we present our first open-source contribution in the area of simplified Communications Platform as a Service (CPaaS) consumption. It is a Node-RED module to create value-added services on top of [sipgate.io](https://www.sipgate.io).

<!--more-->

### //a workshop focus

One of Automat Berlin's focal points is developing open-source based graphical extensions of Communications Platform as a Service (CPaaS) Application Programming Interfaces (APIs) for faster use case prototyping. We briefly [introduced](https://automat.berlin/2019/08/09/automat-workshop) the graphical wiring tool Node-RED already.

In the following, we explain our first open-source contribution in the area of simplified CPaaS consumption. We have developed a module for the wiring tool Node-RED as introduced in our [previous post](https://automat.berlin/2019/08/09/automat-workshop). It should help to create value-added services on top of [sipgate.io](https://www.sipgate.io) - the Application Programming Interface (API) [sipgate](https://www.sipgate.de) offers to all of their customers.

### Node-RED for CPaaS development

Node-RED's wiring capabilities are used to act as a graphical user interface (GUI) for the Automat adapter connecting to the sipgate.io API. The integration with sipgate is exemplary; the modular [Automat adapter concept](https://automat.berlin/2019/08/09/automat-workshop/) is aiming to support various CPaaS platforms and significant open-source communications stacks in the future.

### sipgate.io

#### Introduction

sipgate is a Voice over IP (VoIP) provider in Germany and the UK. Their products focus on both consumers as well as business customers. While business customers have access to a tailored service portfolio on top of the sipgate core infrastructure, residential customers have only access to a very generic set of features.

The very basic features that sipgate provides are telephone numbers and the possibility to make and receive telephone calls. Their customers usually connect their Session Initiation Protocol (SIP) capable clients/servers to their infrastructure. Various value-added service features such as voicemail can be booked via the company's feature store.

A hidden gem of the features one can add is access to an API product called **sipgate.io**, where customers can manipulate calls and account features, amongst others.

This API is easy to consume for knowledgable developers with experiences both server-side scripting and telecoms flows. It is, however, not very consumer-friendly.

We use Node-RED to create flows with Action attributes for inbound/outbound calls graphically and connect them to dynamically create XML that interacts with the sipgate API. Our contribution should make the API consumptions significantly easier for consumers and is explained in the following.

*This integration has not been endorsed by sipgate or any of its affiliates. It serves as a reference project to Automat Berlin.*

#### Code

The initial focus has been given to implementing the Actions of the Push API, i.e., manipulating incoming or outgoing calls before they are connected to the respective party. Some Real-Time Call Manipulation (RTCM) API features have also been implemented (e.g., terminating an ongoing call), but not given preference.

Within the sipgate.io front-end, the Node-RED server and webhook endpoint from our module need to be specified. This enables the simple integration of Push API Actions into Node-RED for execution after receiving HTTP POST webhooks.

The following Action attributes are available as nodes:

- `DIAL`: Send a call to a voicemail or external number
- `PLAY`: Play a sound file
- `GATHER`: Collect digits that a caller enters with the telephone keypad
- `REJECT`: Reject a call or pretend to be busy
- `HANGUP`: Hang up a call

Most of the nodes have configuration parameters. Some of them have flexible outputs depending on their configuration.

Besides singular nodes, some nesting for everyday use cases has been implemented (e.g., playing an audio file while gathering inputs). The sample RTCM method `hangup-call` is made available also.

The package is available at [**npm**](https://www.npmjs.com/package/@automat-berlin/node-red-contrib-sipgate) as well as in the [**Node-RED flow library**](https://flows.nodered.org/node/@automat-berlin/node-red-contrib-sipgate).

The source code is available on our [**Github page**](https://github.com/automat-berlin/node-red-contrib-sipgate).

#### Sample

We begin with the sample use case of creating an Interactive Voice Response (IVR) service. It asks a caller for specifying which member of a family (that hosts their home phone number with sipgate) to call and route the call accordingly.

In the sipgate.io portal, the inbound URL for the respective number is set to the specified `baseUrl` with the path of the `webhook` node appended.

<img src="/images/nodered-sipgate-portal.jpg" alt="sipgate portal configuration" title="sipgate portal configuration" width="650px" />

The flow consists of nodes from our module (`gather`, `dial`), as well as default Node-RED nodes (`switch`).

<img src="/images/nodered-sipgate-sample-overview.jpg" alt="Sample Flow - Overview" title="Sample Flow - Overview" width="650px" />

The `input` node is used to specify the path of the webhook URL that is configured with sipgate.io.

<img src="/images/nodered-sipgate-sample-webhook.jpg" alt="Sample Flow - webhook node" title="Sample Flow - webhook node" width="650px" />

The `gather` node is configured to play a voice prompt that has been created using [Google Cloud Platform (GCP) APIs](https://github.com/automat-berlin/gists/blob/master/google-tts-sipgate.sh). The node is configured to collect a single digit within 20s.

<img src="/images/nodered-sipgate-sample-gather.jpg" alt="Sample Flow - gather node" title="Sample Flow - gather node" width="650px" />

The input of the calling party is passed to the `switch` node. Depending on the value, the correct output is selected, and the respective family member is called.

<img src="/images/nodered-sipgate-sample-switch.jpg" alt="Sample Flow - switch node" title="Sample Flow - switch node" width="650px" />

The `dial` node connects both parties.

<img src="/images/nodered-sipgate-sample-dial.jpg" alt="Sample Flow - dial node" title="Sample Flow - dial node" width="650px" />

### Outlook

It is planned to not only make direct API access available but also integrate the Automat adapters with service enablers. This module is going to be extended to contain Text-To-Speech (TTS) service integration so that voice prompts do not need to be created and hosted manually but as part of this implementation.

Follow us on [LinkedIn](https://www.linkedin.com/company/automat-berlin) or [Twitter](https://twitter.com/AutomatBerlin) to be notified about updates.

If you would like to contribute, you are more than welcome. Have a look at our contributing guidelines or [get in touch](mailto:info@automat.berlin).
