---
title: "Blog >> WhatsApp's Signal Protocol integration is now complete"
layout: post
author: moxie0
---

<img src="/blog/images/whatsappcomplete2.png" alt="WhatsApp Verification Screen"/>

At Open Whisper Systems, our goal is to make private communication simple.  A year ago, we [announced
a partnership](https://whispersystems.org/blog/whatsapp/) with WhatsApp and committed to
integrating the Signal Protocol into their product, moving towards full end to end encryption for all of their users by default.

Over the past year, we've been progressively rolling out Signal Protocol support for all WhatsApp
communication across all WhatsApp clients.  This includes chats, group chats, attachments,
voice notes, and voice calls across Android, iPhone, Windows Phone, Nokia S40, Nokia S60, Blackberry, and BB10.

As of today, the integration is [fully complete](https://www.whatsapp.com/security). Users running the most
recent versions of WhatsApp on any platform now get full end to end encryption for every message they send
and every WhatsApp call they make when communicating with each other.  This includes all the benefits of the
Signal Protocol -- a modern, open source, forward secure,
[strong encryption protocol](https://whispersystems.org/blog/advanced-ratcheting/) for asynchronous messaging
systems, designed to make end-to-end encrypted messaging as seamless as possible.

XXXXX

## Transitions

Before all users have updated to the latest version of the software for their platform, there will still be some
plaintext on the network.  To make this transition as clear as possible, WhatsApp
clients notify users when their chats become end to end encrypted.  Starting today, users will see a notice in their
conversation screen as their individual and group chats become end to end encrypted.  Additionally, the encryption
status of any chat is visible under that chat's preferences screen.

Once a client recognizes a contact as being fully e2e capable, it will not permit transmitting plaintext to that
contact, even if that contact were to downgrade to a version of the software that is not fully e2e capable.  This prevents
the server or a network attacker from being able to perform a downgrade attack.

Eventually all the pre-e2e capable clients will expire, at which point new versions of the software will no longer transmit
or accept plaintext messages at all.

<img src="/blog/images/whatsapp-e2e-notice.png" width="325px" style="float:left;"/>
<img src="/blog/images/whatsapp-e2e-profile.png" width="325px"/>

## Verification

By default, WhatsApp users have the option to verify the authenticity of their encrypted session.  Like Signal, this can be
done by either scanning a QR code or by reading a string aloud.  We've updated the Signal Protocol to support
a fully numeric fingerprint format, which we call "security codes" in WhatsApp.  A fully numeric fingerprint
format has a few advantages:

1. They're easy to localize.  WhatsApp has a billion active users across the globe, so using a wordlist in a
   single language is not an option, and trying to localize wordlists to make cross-language comparisons possible
   is very error prone.  Likewise, hexadecimal representations are not compatible with all alphabets.  However,
   all languages WhatsApp supports have a consistent concept of base 10 digits that security codes can be
   seamlessly localized to.

1. They're visually and audibly distinct.  Numeric representations in all languages have a lot of evolution
   behind them which has pushed them towards visual and audible distinguishability.

1. They're still relatively compact.  Users compare 12 groups of 5 digits with each other.

Additionally, WhatsApp users can opt in to a preference which notifies them every time the security code for
a contact changes. For more information, see the technical document WhatsApp has published [here](https://www.whatsapp.com/security/WhatsApp-Security-Whitepaper.pdf).

<img src="/blog/images/whatsapp-e2e-verify.png" width="325px"/>

## More to come

Over a billion monthly active users across the world are now using the Signal Protocol for end
to end encryption.  Over the next year, we will continue to work with additional messengers
to amplify the impact and scope of private communication even further.  We're excited about the future
of the Signal Protocol and the places it is going.