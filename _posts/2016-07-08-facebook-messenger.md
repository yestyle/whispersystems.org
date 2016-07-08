---
title: "Blog >> Facebook Messenger deploys Signal Protocol for end to end encryption"
layout: post
author: moxie0
---

<img src="/blog/images/fbmessenger.png" alt="FB Messenger Secret Conversation"/>

Facebook Messenger has started rolling out [Secret Conversations](https://newsroom.fb.com/news/2016/07/messenger-starts-testing-end-to-end-encryption-with-secret-conversations/), a feature that enables end to end
encryption for conversations within Messenger.  Secret Conversations is built on Signal Protocol,
a modern, open source, [strong encryption protocol](/blog/advanced-ratcheting) we developed for asynchronous
messaging systems.

XXXXX

Signal Protocol powers our own private messaging app, [Signal](/signal/install). The protocol is designed from the
ground up to make seamless end-to-end encrypted messaging possible and to make private
communication simple.  To amplify the impact and scope of private communication, we also collaborate
with other popular messaging apps like [WhatsApp](/blog/whatsapp-complete/), [Google Allo](/blog/allo),
and now Facebook Messenger to help integrate Signal Protocol into those products.

For more detail, Facebook has [published a document](https://fbnewsroomus.files.wordpress.com/2016/07/secret_conversations_whitepaper.pdf) with technical details of their Signal Protocol
deployment.  They use our open source [Signal Protocol libraries](https://github.com/whispersystems/),
and we've verified that the integration was done appropriately.  While this release does not enable end
to end encryption for all conversations by default, like you'd find in WhatsApp or Signal, it's still a
big step, and we hope that Messenger will continue to iterate on this deployment to make end to end
encryption more pervasive throughout their product.

## More to come

At Open Whisper Systems, we're going to continue our efforts to advance the state of the art for
frictionless private communication, in our own app and in others. We're excited about the future
for Signal Protocol and the places it is going.