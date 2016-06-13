---
title: "Blog >> License update"
layout: post
author: moxie0
---

Signal Protocol is a modern, open source, [strong encryption protocol](/blog/advanced-ratcheting) for asynchronous messaging
systems.  We use Signal Protocol as the foundation for our own private messaging app, Signal, but
also make Signal Protocol libraries available [for other applications to use](/blog/whatsapp-complete).

Our Signal Protocol libraries are open source, licensed GPLv3.  We like the GPL for the quality control that it
provides.  If someone publicly says that they're using our software, we want to see if they've made
any modifications, and whether they're using it correctly.  This helps to increase transparency and
accountability in deployments of our software, which we feel are important for end to end encryption.

XXXXX

Some Open Source iOS applications have felt uncomfortable using our library even when complying with the
GPL, since the Apple App Store [imposes its own license restrictions](https://www.apple.com/legal/internet-services/itunes/us/terms.html)
that are incompatible with the GPL. It hasn't been our intention to prevent open source applications from
being able to distribute our libraries through the Apple App Store, and we have always said that we have
no problem with it so long as these applications are otherwise in compliance with the GPL.

Today we've clarified this further by [updating the license on our libsignal-protocol-c library](https://github.com/whispersystems/libsignal-protocol-c#license) to make this an additional permission.  Applications that comply with the GPL are now
explicitly authorized to be distributed through the Apple App Store and remain in compliance with the license.