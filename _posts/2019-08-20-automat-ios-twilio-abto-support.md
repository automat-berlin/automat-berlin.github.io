---
layout: post
title: "Twilio and ABTO arrived to //afone"
excerpt_separator: <!--more-->
---

A few weeks earlier, we have [introduced //afone](https://automat.berlin/2019/07/11/afone-ios/), our reference VoIP implementation for iOS, with a flexible adapter architecture. Today we are announcing support for Twilio and ABTO.

<!--more-->

Our adapter architecture allows us to exchange the used VoIP SDK effortlessly. Depending on which CPaaS provider you want to use or if you have decided to use your private VoIP backend, you need only to implement a few methods. We provide ready to use SIP adapters for PortSIP SDK, ABTO SDK, and for the first time also for the WebRTC based TwilioVoice SDK.

Twilio is the de-facto leader for CPaaS providers on the market as of today. The TwilioVoice SDK is WebRTC based as opposed to PortSIP and ABTO SDKs, but it is still straightforward to integrate into //afone using our adapter architecture. In our TwilioVoiceAdapter, we have decided to concentrate only on audio calls for simplicity's sake.

ABTO is a SIP-based SDK, similar to PortSIP SDK. It is less complicated than other SIP SDKs and thus does not provide a full //afone experience when it comes to video calls. We were told by ABTO support that this would change in a future release of ABTO SDK though.

Please visit our [Github repository](https://github.com/automat-berlin/afone) for the implementation details.

In our next article, we will focus on explaining where to start if you would like to write your own adapter.
