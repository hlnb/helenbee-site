---
layout: layouts/writing.njk
title: 'Eight Years Later: What Happened to the Promise of eHealth?'
subtitle: ''
description: In 2018, I looked at whether connected health technology could help older Australians remain independent at home. Eight years later, the machines can talk to each other — but connection turned out to be only the beginning.
excerpt: In 2018, I wrote about eHealth, M2M communication and the possibility of using connected technology to help older Australians remain at home. Eight years later, I look back at what came true, what changed, and the harder questions around interoperability, health data, privacy, autonomy and what independence really means.
date: 2026-10-26T00:33:00+08:00
publishedDate: 2026-10-26T00:33:00+08:00
theme: ''
keywords:
  - eHealth
  - connected health
  - digital health in Australia
  - machine-to-machine communication
  - health data interoperability
  - remote patient monitoring
  - ageing at home
  - health data privacy
  - patient autonomy
type: reflection
tags:
  - eHealth
  - digital health
  - M2M
  - connected health
  - wearables
  - health data
  - ageing
  - independence
  - privacy
  - technology
category: technology
series: ''
image: /assets/images/other/ehealth-hero.webp
image_alt: An older person at home in natural morning light, sitting at a kitchen table with a cup of tea or coffee, wearing a smartwatch with a smartphone nearby. The technology is present but not dominant. The mood is calm and everyday, suggesting independence, connection and ageing at home rather than medical treatment.
image_credit: null
author:
  name: Helen Burgess
socials:
  bluesky: https://bsky.app/profile/@hlnbee.bsky.social
  mastodon: https://mastodon.social/@helenbee
  facebook: https://www.facebook.com/profile.php?id=61572267654772
siteUrl: https://helenburgess.id.au
bluesky_description: Eight years ago, I was asking whether connected technology could help older Australians remain independent at home. The technology arrived. What interests me now is what happens after the machines connect — and whether all that data actually gives people more control over their lives.
mastodon_description: Eight years ago, I was asking whether connected technology could help older Australians remain independent at home. The technology arrived. What interests me now is what happens after the machines connect — and whether all that data actually gives people more control over their lives.
facebook_description: Eight years ago, I was asking whether connected technology could help older Australians remain independent at home. The technology arrived. What interests me now is what happens after the machines connect — and whether all that data actually gives people more control over their lives.
newsletter: true
draft: false
---

_When I first wrote about eHealth, I was interested in whether connected technology could help older Australians remain independent at home. The machines can certainly talk to each other now. What interests me eight years later is what happens after they do._

In 2016, while completing my first Master's degree, I wrote an assessment on eHealth systems and machine-to-machine communication. That work later fed into an essay I published on my website in 2018.

At the time, _machine-to-machine_, or M2M, was a useful way of describing something that still felt relatively new: devices collecting information and passing it to other devices or systems without someone having to manually move the information themselves.

I was particularly interested in what this could mean for older Australians who wanted to remain living independently at home. The research I was reading looked at remote patient monitoring, telecare, body sensors and communication between someone's home and a monitoring service. Some systems used a gateway between small sensors and the wider network because those sensors did not necessarily have enough power, memory or processing ability to do everything themselves.

There was also the idea of _ambient assisted living_: technology working quietly in the background of someone's home, collecting information that might suggest something had changed and passing that information on when necessary. Security mattered because this was not always harmless fitness information. Some of it could be connected directly to someone's health or safety.

I was interested in the technology, obviously. I have always been interested in how systems connect and what happens when one part of a system has to talk to another. But underneath all of that was a much more human question: could connected technology help someone remain in control of their own life?

Looking back now, much of the M2M future I was studying did arrive; we just don't tend to call it M2M anymore.

## When the future became ordinary

The language has changed. We are more likely to talk about the Internet of Things, connected health, wearables, remote patient monitoring, APIs and interoperability, but the basic idea remains familiar. A device collects information, that information passes through an app, phone, gateway or online service into another system, and someone else — or another piece of software — can then do something with it.

That is essentially the architecture I was studying years ago.

<figure class="writing-image-figure writing-image-figure--bordered">
  <img src="/assets/images/other/m2m-then-and-now.webp" alt="Diagram comparing a 2016 M2M health system using a body sensor, home gateway and remote monitoring centre with a modern connected-health system using a wearable, phone, cloud platform and healthcare system." data-fit="natural">
  <figcaption>Then and now: The basic idea behind M2M health monitoring has remained remarkably similar, even as phones, cloud services, apps and health platforms have replaced or expanded the gateways I was studying in 2016.</figcaption>
</figure>

Remote patient monitoring is probably one of the clearest examples. Information can now be collected while someone is at home rather than only when they are sitting in a clinic and, depending on the system, that information can become available to healthcare providers.

Telehealth has followed a similar path. Its use accelerated during the pandemic and expanded telehealth services became an ongoing part of Medicare from January 2022. For some people, that can mean avoiding a long journey or the effort involved in getting to an appointment that could reasonably happen from home.

I don't think that should be dismissed as merely convenient, because sometimes convenience is what makes something possible.

Australia's digital-health systems have also grown considerably. My Health Record now contains more than 25 million records and billions of documents. That does not mean every part of the health system suddenly communicates beautifully with every other part, but it does mean that electronic health information has become much more ordinary than it was when I first started thinking about this.

So if I went back to one of my earlier questions — _Can someone's home become part of a connected healthcare environment?_ — I think the answer is clearly yes. What I did not fully appreciate then was that establishing the connection would be one of the easier parts.

## From connection to understanding

One of the issues I explored in my original research was whether different devices and networks could work together. M2M was never simply about one sensor successfully sending something to another machine. There were standards, different communication methods and questions about whether systems built by different organisations could actually understand each other.

That issue has not gone away; it has simply become more complicated. Today we talk much more about _interoperability_. In plain English, that means it is not enough for one system to send information to another. The system receiving it also needs to understand what the information actually means.

A blood-pressure reading is a simple example. Sending `120/80` from one machine to another is not particularly useful unless the receiving system also knows whose reading it is, when it was taken, what the numbers represent and what units are being used.

<figure class="writing-image-figure writing-image-figure--bordered">
  <img src="/assets/images/other/connectivity-vs-interoperability.webp" alt="Diagram showing the difference between simply transmitting health data between devices and interoperable exchange where patient identity, measurement, units, time and context travel with the data." data-fit="natural">
  <figcaption>Connection is only part of the problem. Interoperability means preserving enough context and meaning for another system to understand and use the information.</figcaption>
</figure>

That is one reason standards such as FHIR have become important in healthcare. They provide agreed ways of structuring and exchanging health information so that different systems have a better chance of understanding each other.

Years ago, I was mostly thinking about whether the machines could communicate securely and reliably. Now I find myself thinking more about whether the information still makes sense by the time it gets to wherever it is going. And, somewhat unexpectedly, I can see that happening in the technology I use myself.

## Living inside something I once studied

My interest in digital health is no longer purely academic. Like many people, I now generate a surprising amount of health information simply by wearing a watch and getting on with my day.

My Garmin watch records things such as activity, heart rate, exercise, stress and sleep. In my own setup, supported Garmin data can move through Google's Health Connect, and my Withings app is connected to Health Connect as well.

In some respects, this is exactly the kind of M2M environment I was studying. A device gathers information, one system passes it onwards and another system can then use it. I don't need to manually type every measurement into every app.

<figure class="writing-image-figure writing-image-figure--bordered">
  <img src="/assets/images/other/connected-health-data-flow.webp" alt="Diagram showing health data moving from a Garmin watch through Garmin Connect and Health Connect, with connected applications such as Garmin and Withings presenting the information in different ways." data-fit="natural">
  <figcaption>My own connected-health example: supported data from Garmin can move through Health Connect and become available to other connected applications such as Withings. The information can travel between systems, but each application still decides how to present and interpret what it receives.</figcaption>
</figure>

The gateway I once imagined as a separate piece of equipment may now effectively be my phone, an operating-system service or something happening online. The details have changed, but the idea has not changed nearly as much.

What I thought much less about back then was what each application would do with the information after receiving it. Sleep is where I notice this most.

In my own use, Garmin tends to present sleep alongside things such as exercise, recovery, heart-rate variability and readiness for activity, while Withings gives me a somewhat different view of the same night, one that feels more centred on general health and sleep patterns. That is my experience of the two apps. I am not suggesting that one is more accurate simply because I prefer one presentation or understand one better.

What I find interesting is that the same night can look different depending on which app I open. The underlying information may overlap, but the interpretation does not necessarily do so.

Recent research supports some caution here. Consumer sleep technologies are not necessarily interchangeable, and measurements with similar names may not mean quite the same thing from one device or system to another.

That has changed how I think about health data. An app is not simply holding up a mirror to my body. It is making choices about what to show me, what to emphasise and how to combine the information it has. The data might be mine, but the interpretation belongs partly to the system.

## When a number feels more certain than it is

There is something wonderfully convincing about a number. If an app tells me my sleep score was 72, it looks very definite.

It is easy to forget how much has happened before that number appeared on the screen. A sensor has collected signals, software has looked for patterns in those signals, algorithms have made decisions about what those patterns might represent, and another set of decisions has determined how much importance to give each part before presenting me with a score.

That does not mean the score is worthless. It does mean I have become more careful about what I think it means.

Research comparing consumer sleep trackers with polysomnography — the clinical method used to study sleep — has found differences in things such as total sleep time, sleep efficiency and sleep stages. Research in older adults also suggests that some consumer sleep devices may be less precise for certain measurements in older people than in younger people.

I don't take that to mean that wearables are useless. For me, they are useful in a different way.

I am much more interested in patterns over time than I am in whether I scored 68 or 78 on a particular morning. If something about my sleep, resting heart rate or activity changes consistently over several weeks, that catches my attention. It may mean something, or it may not, and if I am concerned about it, that is the point where I would rather talk to someone who can put the number into context than let an app convince me it has already explained what is happening.

I think that is probably a healthier relationship with the technology than treating every score as a verdict.

## The security question never disappeared

Security was a large part of my original research. Some of the papers I reviewed looked at attacks against wireless networks used in assisted-living systems. Others considered authentication, access control and privacy, including the fact that connected systems could potentially reveal not just health information but someone's location.

I was also uncomfortable with systems that appeared to assume security would somehow be taken care of by the communication protocol itself. I noted examples where security seemed to have been overlooked or treated as secondary during the design of an eHealth application.

That concern feels even more relevant now because there are simply more places for information to go. A health measurement might begin with a watch, move to a phone, pass through Health Connect, appear in another app and perhaps eventually become useful in a healthcare context.

Each connection can be useful, but each one also raises another question about who has access to the information.

I want to know not only whether my data is encrypted while it moves between systems. I also want to know who can see it, why they can see it, what they keep and whether I can change my mind later.

This is where convenience and autonomy can start pulling in different directions. It is convenient when one app can automatically receive information from another, and it is less convenient to stop and read every permission screen. But if I simply accept everything because I want the systems to work smoothly, how much control have I actually retained?

That feels especially important when we start talking about older people, people managing chronic conditions or anyone who relies on somebody else to help them set up the technology. Clicking **Allow** is easy; knowing exactly what you have allowed is another matter.

## When wellness and healthcare start to blur

Something else from the original research has stayed with me. The systems being discussed for personal fitness did not necessarily have the same requirements as systems intended for disease management or ageing independently. A fitness update and an alert related to someone's health do not carry the same consequences if something is delayed or wrong.

That difference still exists, but it is harder to see from the user's side.

A fitness app, a general wellness app and a piece of software being used for a medical purpose can all sit beside one another on the same phone. They can all receive information from the same wearable and produce polished graphs and reassuring-looking scores.

But they are not necessarily doing the same job.

The Therapeutic Goods Administration distinguishes general wellness software from software intended for medical purposes such as diagnosing, monitoring, predicting or treating disease. That distinction matters to me because the screen itself does not always tell us how much confidence we should place in what is being shown.

Artificial intelligence complicates that further. AI is increasingly being used in health software, including tools that help document clinical consultations and systems that analyse information. I don't find the words _AI-powered_ particularly persuasive by themselves anymore. I am more interested in what the AI is actually doing, whether it is summarising, suggesting or making a judgement that might influence somebody's care, what evidence supports that judgement, and what happens when it gets something wrong.

That isn't me being anti-technology. Quite the opposite. I've spent enough of my life around technology to know that understanding what a system actually does is usually more useful than being impressed by what somebody has called it.

## Independence has its own dependencies

The reason I became interested in all of this in the first place still matters most to me: could technology help older Australians remain at home?

I still think it can.

Australia's Support at Home program is built around the broader goal of helping older people remain living in their own homes, and assistive technology and home modifications can form part of that support.

Remote consultations can save a difficult trip. Monitoring devices can collect useful information without requiring every measurement to happen in a clinic. An alert may provide reassurance. A connected device might help somebody notice that something has changed.

All of that can matter, but what has changed is the way I think about _independence_.

When I first studied these systems, I probably thought more about what technology could enable. Now I think more about what the person has to do to keep that technology working.

Devices need charging. Apps need updating. Passwords need remembering. Internet connections fail. Permissions change. Bluetooth occasionally appears to have reconsidered the entire relationship.

For me, those things are usually annoying. For somebody who is not confident with technology, they can become barriers.

A person can be perfectly capable of continuing to live in their own home while still needing somebody else to manage the technology that is supposed to be helping them remain independent. That is a tension I don't think I fully appreciated when I was concentrating on networks, protocols and devices.

Accessibility therefore needs to mean more than making the text larger or the buttons easier to press. It also has to involve how much knowledge, maintenance and confidence we expect from the person using the system. Otherwise we risk replacing one form of dependence with another.

## Monitoring is not the same as caring

There is another limit that has become clearer to me over time. Connected systems can become very good at telling us that something happened, but they are much less good at understanding what it means to the person.

A movement sensor might tell us that somebody walked around their home this morning, but it cannot tell us whether they are lonely. A wearable might notice a change in heart rate, but it cannot sit at the kitchen table and notice that someone seems unusually quiet. A video appointment may make healthcare easier to access, but it cannot reproduce every interaction that happens when two people are sitting in the same room.

None of that makes remote monitoring a bad thing. It simply means monitoring and caring are not interchangeable.

Technology can support human relationships, but I become less comfortable when efficiency starts being treated as a reason to remove those relationships altogether. For me, that matters particularly when we talk about ageing at home. Remaining physically inside your own house is not necessarily the same thing as remaining independent, supported or connected to other people.

## The question I would ask now

When I first researched eHealth and M2M communication, many of my questions were technical. Could the sensors communicate reliably? Could different devices work together? Could the information make its way from someone's home to a healthcare service? Could that communication be secured? Could all of this help an older person remain safely at home?

Those questions made sense at the time, and many now have at least partial answers. Devices can communicate, information can travel from the home into other systems, wearables and other connected devices can collect information continuously, and remote monitoring has moved well beyond the research scenarios I was reading about.

But the questions I find myself asking now are different.

**Can connected health technology help older Australians remain safely and independently at home?**

I still think it can, but I am much less interested in treating the connection itself as the achievement. I want to know whether the systems work together well enough for the information to remain useful, whether people understand what the technology is telling them without assuming that every algorithm-generated score is an unquestionable fact, and whether they know where their information is going and have meaningful choices about who can access it.

I also want the technology to be usable by the person whose independence it is supposed to support, rather than only by the people who designed it. Most importantly, I want it to leave that person with more control over their life, not simply surround them with more devices.

When I wrote about M2M communication, I thought I was mainly exploring a networking, security and technology problem. Looking back, I can see that I was also asking about autonomy, dignity and connection: about what independence actually means, how much convenience we are willing to exchange for privacy, and whether technology genuinely supports a person's choices or simply creates a more efficient way of watching them.

<figure class="writing-image-figure writing-image-figure--bordered">
  <img src="/assets/images/other/connectivity-to-autonomy.webp" alt="Diagram showing the progression from connectivity through interoperability, interpretation and trust to autonomy." data-fit="natural">
  <figcaption>What began for me as a question about connectivity has become a much broader question about whether connected health technology remains understandable, trustworthy and under the control of the person using it.</figcaption>
</figure>

The M2M future I was studying did arrive, although its name and technology changed along the way. I don't think that means the problem has been solved. If anything, the technology becoming ordinary has made the human questions easier to see.

What matters much more to me now is whether what happens after the machines connect actually helps the person whose life all that data is meant to describe.




## References and further reading

**Burgess, E. H. (2016).** _A Review of eHealth Systems and M2M Communication Security: Annotated Bibliography._ ITC571 Emerging Technologies and Innovation, Charles Sturt University. My original academic research into M2M architecture, connected health, ambient assisted living, remote monitoring, interoperability, privacy and security.

**Australian Digital Health Agency.** _Remote Patient Monitoring._ Australian guidance covering connected monitoring, clinical-system integration, interoperability, cybersecurity and consent.

**Australian Digital Health Agency.** _My Health Record statistics._ Current information about Australia's national digital-health record system.

**Australian Government Department of Health, Disability and Ageing.** _Ongoing telehealth — Strengthening primary care._ Information about Medicare telehealth becoming ongoing from January 2022.

**Australian Government Department of Health, Disability and Ageing.** _Support at Home._ Information about supporting older Australians to remain living at home.

**Android Developers.** _Health Connect._ Information about health-data permissions, data exchange and source priorities.

**Withings Support.** _Connecting Garmin Connect to Withings through Health Connect._ Information about sharing supported Garmin data with the Withings app.

**Therapeutic Goods Administration.** _Software-based medical devices for consumers._ Guidance on general wellness software and software intended for medical purposes.

**Therapeutic Goods Administration.** _Digital scribes._ Guidance on AI-enabled clinical software and medical-device regulation.

**Recent wearable sleep research, 2025–2026.** Studies comparing consumer sleep trackers with clinical sleep studies and with one another provide useful context for understanding both the value and limits of wearable sleep information.
