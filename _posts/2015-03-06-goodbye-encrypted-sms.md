---
title: "Blog >> Saying goodbye to encrypted SMS/MMS"
layout: post
---

It's 2015, and the end of the road for encrypted SMS/MMS in TextSecure.

The TextSecure story started back in 2009, at the dawn of the smartphone era. Back then, TextSecure focused on
securing the transport that everyone coming from feature phones was familiar with: SMS.  Today, many things have
changed, and TextSecure now emphasizes the "TextSecure transport," which uses data rather than SMS. While we remain
committed to supporting *plaintext* SMS/MMS so that TextSecure can function as a unified messenger, we are beginning
the process of phasing out support for SMS/MMS as an *encrypted* transport.

XXXXX

A number of important factors have led us here:

1. **Encrypted SMS/MMS can never be seamless**.  Unlike the TextSecure transport, the encrypted SMS/MMS flow is high
   friction from the start. Users need to manually initiate a "key exchange," which requires a full round trip before
   any messages can be exchanged.  We don't believe that people should even need to know what a "key" is, so this
   added bit of friction has always felt wrong to us.

   In addition to that friction, the edge cases for encrypted SMS/MMS are where users feel real pain. It's not possible
   for us to detect uninstalls or reinstalls, resulting in a situation where sessions are half-open, or where users
   who've uninstalled TextSecure receive blocks of garbled text from their contacts who still have active sessions.
1. **iPhone compatibility is here**.  We recently launched [Signal for iPhone](/blog/the-new-signal), which includes
   support for TextSecure-compatible messaging.  However, iOS does not have APIs that allow us to programatically
   send/receive SMS messages. This means that encrypted SMS messages to iPhone users won't work, which creates
   potentially confusing compatibility issues for users.
1. **SMS and MMS are a security disaster**. They leak all possible metadata 100% of the time to thousands of cellular
   carriers worldwide. It's common to think of SMS/MMS as being "offline" or "peer to peer," but the truth is that
   SMS/MMS messages are still processed by servers--the servers are just controlled by the telcos.  We don't want the
   state-run telcos in Saudi, Iran, Bahrain, Belarus, China, Egypt, Cuba, USA, etc... to have direct access to the
   metadata of TextSecure users in those countries or anywhere else.
1. **It's holding us back**.  Dealing with all the corner cases associated with the encrypted SMS/MMS transport prevents
   us from dedicating focus and attention to make the overall product better.

### You monsters, what about the people who can't afford data?

It's common for people in the US and Europe to assume that SMS is the accessible option for people in the global
south, but the truth is just the opposite.  It's primarily just the US and parts of Europe that have affordable/unlimited
SMS plans. For the most part, the global south is hungry for overlay services that they can use *instead* of SMS,
precisely because SMS is so expensive in those places.  Just look at the places where market penetration of overlay
services like Viber, Line, and WhatsApp have been the highest.  The phrase "WhatsApp number" has even replaced the
phrase "phone number" in many parts of south america.

There are certainly places where data is not accessible, but those are also mostly places where smartphones are
equally inaccessible. We've talked with everyone we can think of to get the best possible picture of our users and their
needs around the world, and this is where we've landed.

### So you're not monsters, but SMS/MMS is more reliable than data.

On Android, TextSecure currently uses Google Cloud Messaging (GCM) as the transport for message delivery over the data channel.
Using GCM allowed us to build a completely read-only message delivery path through the server, which has been really
great for TextSecure server scalability.

Unfortunately, GCM has proven periodically unreliable in some regions and network conditions.  This has slowly gotten worse
over time, and Google doesn't seem intent on remedying it. As a result, in conjunction with removing support for encrypted
SMS/MMS, we'll simultaneously move to a model of handling message delivery ourselves -- relying on GCM only for a wakeup
event.  This should finally eliminate any periodic reliability issues.

### So we're moving on.

We've just started rolling out TextSecure version 2.6.0, which will be the last major release version to support encrypted
SMS/MMS.  TextSecure 2.7.0 will only support encryption through the TextSecure transport, as well as plaintext SMS/MMS.
