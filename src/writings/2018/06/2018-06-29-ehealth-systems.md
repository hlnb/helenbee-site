---
layout: layouts/writing.njk
title: eHealth Systems, M2M Communication & Security
date: 2018-06-29
publishedDate: "2018-06-29"
theme: "Technology and Society"
keywords: [technology, ehealth, m2m, internet of things, security]
type: "article"
category: technology
tags: [technology, ehealth, m2m, internet of things, security]
image: /assets/images/other/iotbasedhealthcare.png
excerpt: This is an essay in regards to innovation in the M2M communication and Internet of Things. Security has been a hot topic for a few years now in the various sectors of business. This essay looks at the implementations of IoT in the e-health sector and what it may mean going forward.
---

<div class="callout note">
<em>Paper written for Masters of Mobile Application Development 16 Aug 2016</em>
Elizabeth H Burgess 11571039  
ITC571 – Innovation and Emerging Technologies  
Session 201660  
Charles Sturt University
</div>
<div class="callout abstract">
<b>Abstract</b>

In previous research various security issues that are of concern for Machine-to-Machine (M2M) communication in the application electronic Health (eHealth). These security concerns are not only just for eHealth; they are for all M2M communications within the domains of Smart Grids, Vehicular Networks and Smart Cars, Smart Houses, and other such networks. Part of this concern is the actual network topologies that are in use along with the networking standards. The other part is the size of the hardware/application used in eHealth, in regards to memory and power supply. There have been some novel proposals of eHealth applications and what these may look like, yet when the discussion happens at the time of proposal, security takes second place in the implementation. Security is an afterthought. We live in a world that, unfortunately, has unscrupulous people within it. Any application we devise for eHealth needs to not only protect the users' information it also needs to protect their privacy. The approach to security within the eHealth or even the now touted mobile health (mHealth) arenas requires a multidisciplinary approach to solving some the security concerns within the use of such devices. eHealth can be separated into several subdomains; each having a set of requirements. From a network point of view, to standardised some of the componetry to provide secure transmission of data is a must. To use the now converging technologies of Internet of Things (IoT), Wireless Body Area Networks (WBANs) and cloud computing will allow standardisation of security as well as improvements in the care of patients by being more patient-centric in the monitoring of their health. This research will focus on collecting and comparing architectural models as well as how security has been proposed in these. Some of the security implementations are novel, yet all authors have come to the same conclusion that traditional security policies and measures are not appropriate for the new paradigm that is the Internet of Things and eHealth. This research will show the most appropriate way to ensure a patient's privacy and security of data from the various models proposed.

</div>

### Introduction

With Berg Insight analysts forecasting that the global market for home monitoring devices integrated with cellular connectivity will grow at a compound annual growth rate (CAGR) of 45.4 per cent in the next five years to reach 19.2 million in 2020 (Bergl Insight, 2015). This has major impacts on security of data gathered as well as security of the networks used to transmit this data. This also impacts on how those networks will be used or integrated into a national eHealth monitoring system. There are several domains that are being explored for the use of M2M to enable the IoT. The domains according to Minoli are:

- Public services and smart cities
- Automotive, fleet management, asset tracking
- Commercial markets
- Embedded networking systems in the smart home and smart office

The embedded networking systems can be further broken down to being:

- Smart appliances
- Automated home
- Smart meters
- eHealth – assisted Living and in home health services (including remote monitoring and remote diagnostics)
- Security and emergency services

(Minoli, 2013)

The research will be focusing on the eHealth segment of embedded networking systems, with a particular look at the Cyber-Physical Systems and the various novel data security measures proposed through various articles in literature to date. Sebestyen, Hangan, Oniga, and Zoltán Gál maintain that the eHealth domain "should set some requirements regarding data acquisition, access control, security and safety." (Sebestyen, Hangan, Ongia, & Gál, 2014) especially as examples in this domain often purport the connection of devices to remotely monitor the elderly living at home for supervision and lifestyle enablement. This does not need to be an automated ubiquitous system, however that may be a point of contention between patient and medical staff.

In the paper "The Internet of Things for Health Care: A Comprehensive Survey" the authors propose that there are three main issues in delivery of eHealth networks. These are:

1. The network topology as it refers to the different elements in eHealth and the various case study scenarios that it has been applied to already;
2. The architecture of applications in regards to their physical elements, the functionality and working principles plus techniques;
3. The platform, referring to both the network model and computing platform.

(Riazul Islam, Kwak, Houssain, Kwak, & Kabir, 2015)

This bears investigation in light of the rise of Cyber-Physical Systems (CPS) being introduced into eHealth services and the ubiquitous solutions proposed by some providers of eHealth services for the care of patients and in home monitoring. Celentano and Röning state that "dependable services need to be implemented in a resource efficient and safe way … Security is a must when dealing with personal information." (Celentano & Röning, 2015). They expound that it may not just be the health providers that would require access to the information collected. The information may be used in forensic investigations, the smart insurance industry as well as governments to determine population well-being etc.

Riazul Islam, Kwak, Kabir Houssain and Kwak provide a conceptual model of ubiquitous healthcare solution in their paper and this is shown below in Figure 1. This is a high level view of the elements required in this model. This model describes a heterogeneous computing environment where data is collected on such items as blood pressure, body temperature, electrocardiograms and even oxygen saturation via sensors and vital signs. This collected data can end up being an enormous amount to store. This model is based on Grid computing and transforms the static and mobile devices such as laptops, tablets and smartphones, into a hybrid of type.

![IoT-based healthcare solution](/assets/images/other/iotbasedhealthcare.png)
_Figure 1: A conceptual diagram of IoT-based ubiquitous healthcare solution (Riazul Islam, Kwak, Houssain, Kwak, & Kabir, 2015)_

Cyber-Physical System(CPS) is defined as where the virtual world intersects with the physical world. It is a System that integrates physical devices, such as sensors, with cyber components so that have an inbuilt analytical system which is able to respond intelligently to dynamic changes. Research into the CPS area was determined to be a key area in 2008 by the US National Science Foundation as well as being listed as a number one research priority by the US President’s Council of Advisors on Science and Technology (Wang, Adid, Lee, Shu, & Xia, 2011) Until now, CPS research and development has predominately been in the Smart Grid, automotive and traffic management domains in the IoT. Now this research is moving into the realm of eHealth due to advances made in the last five years in wireless sensor networks (WSNs), medical sensors and cloud computing. This makes CPS one of the major candidates for healthcare application solutions specifically in in-hospital and in-home patient care according to Milenkovic, Otto, and Jovanov. (Milenkovic, Otto, & Jovanov, 2006).

The advantages of having a CPS are: that there is network integration as the networking architecture would comply with standards already in place; it would provide interaction between humans and the system to provide better decision making; having a valid and trustworthy system as it behaves in a known way in existing environments and is able to work in new and unreliable environments as well; system performance is better as the sensors are able to provide better feedback and end-user maintenance; it is scalable to large amount of users due to access to cloud computing infrastructure; It could provide autonomy due to the sensor-cloud integration; it would be flexible; and provide better response times. (Haque, Aziz, & Rhaman, 2014)

Sawand, Djahel, Zhang and Naït-Abesselam, proposed a CPS framework for eHealth monitoring that encompassed four major components. These components were:

- Situational awareness sensors
- Communication networks
- Medical Data processing servers and
- Clinical Terminals.

They also asserted that “the quality of eHealth care service relies on the seamless integration of the above essential components” (Ajmal, Djahel, Zhang, & Naït-Abdesselam, 2014). “energy efficiency and patient privacy are always among the top concerns of eHealth care services”. (Ajmal, Djahel, Zhang, & Naït-Abdesselam, 2014) is also of importance in the development of eHealth CPS. Figure 2 is a diagram of the proposed CPS Architecture for eHealth Monitoring proposed in their paper.

![CPS Architecture](/assets/images/other/cpsArchitecture_ivpwxp.png)
_Figure 2: CPS Architecture for eHealth Monitoring_

Security and privacy have also been highlighted in the existing literature, although Ajmal, Djahel, Zhang, and Naït-Abesselam have gone deeper and identified that security and privacy requirements for this technology space “must be taken into account from scratch of data collection, avoiding any post-processing with the purpose of enhancing security or privacy.” (Ajmal, Djahel, Zhang, & Naït-Abdesselam, 2014) This paper details some novel ways of protecting eHealth data by the use of Biometric cryptography in WBAN interconnection, as well as advance signal and image processing “to achieve privacy-aware cloud-assisted healthcare monitoring system. … significantly benefit … improving secure and efficient eHealth monitoring system.” (Ajmal, Djahel, Zhang, & Naït-Abdesselam, 2014)

Chen and Chang highlighted that “security and privacy issues must be addressed before CPS can be widely deployed” in diverse areas including assisted living and health care. (Chen & Chang, 2012). Chen and Chang also purported that existing policies dealing with traditional application would be inadequate for CPS applications in all domains. They have provided their own architecture for a secure CPS that can be used across domains.

There are numerous threats to eHealth systems whether they be a CPS system or a Grid Hybrid system. These threats are similar to those already experienced on the internet in terms of physical security, social engineering as well as software attacks and direct access to the data. Habib and Leister have provided a comprehensive set of tables outlining not only threats; the identification of key assets and vulnerabilities, in the IoT paradigm. Other threats identified were data impairment; dropped data; counterfeit data; data collision and compromised data routing. Vulnerabilities revolve around usability of the application; unprotected environment as well as insufficient awareness by both patient and staff. Habib and Leister also agree with Chen and Change in regards to existing policies and security mechanism not being up to the task of eHealth in IoT. (Habib & Leister, 2015)

To this end adaptive security technology is being developed for the IoT and eHealth applications. One of the major thoughts in this area of research is that of context aware security. One of the major trade-offs is that devices in eHealth have limited computing power, and limited energy resources. Hamdi and Abie propose a system using Markov game theory to balance the “trade-off between improving the mitigation capabilities of the BAN and extending the lifetime of the smart things.” (Hamdi & Abie, 2014) The usefulness of this approach for sensors in Body Area Networks where security effectiveness should be prioritised at a granular level.

For a completely secure system in eHealth we believe the use-cases as described in the ETSI Technical Report, require a multilayer approach to ensure patient and data security and confidentiality. (ETSI, 2013). No one approach has the golden bullet for securing eHealth applications however this is not to say that implementing a cross-section of approaches would not be out of reach.

### Methodology

This project will compare various M2M architectural networks that have been proposed for eHealth/mHealth purposes. We will describe each network as proposed by their designers in detail and ascertain where the security components may lie within that architecture. We will also look at the various components used within eHealth applications and the network standards proposed to be used with those applications to see which ones are better suited for eHealth/mHealth. The architectural networks will then be appraised as to their suitability for eHealth services implementation.

### Project Management

As you can see from the image below this is the project timeline, tasks and resources.

![Project Timeline](/assets/images/other/Project-Chart-ITC571_g5t1kb.png)

### References

Ajmal, S., Djahel, S., Zhang, Z., & Naït-Abdesselam, F. (2014). Multidisciplinary Approaches to Achieving Efficient and Trustworthy eHealth Monitoring Systems. IEEE/CIC ICCC 2014 Symposium on Privacy and Security in Commutations (pp. 187-192). Paris: IEEE.

Bergl Insight. (2015, December). mHealth and Home Monitoring. Retrieved August 2, 2016, from Berg Insight: https://www.berginsight.com/ReportPDF/Summary/bi-mhealth7-sum.pdf

Celentano, U., & Röning, J. (2015). Framework for dependable and pervasive eHealth services. Internet of Things (WF-IoT), 2015 IEEE 2nd World Forum on (pp. 634-639). Milan: IEEE.

Chen, D., & Chang, G. (2012, January 12). A Survey on Security Issues of M2M Communications in Cyber-Physical Systems. KSII Transactions on Internet and Information Systems, 6(1), 24-45.

Chen, M., Wan, J., & Li, F. (2012, Feb). Machine-to-Machine Communications: Architectures, Standards and Applications. KSII TRANSACTIONS ON INTERNET AND INFORMATION SYSTEMS, 6(2), 480-497.

ETSI. (2013). ETSI TR 102 732 v1.1.1 (2013-09) Machine-to-Machine Communications (M2M); Use Cases for M2M applications in EHealth. European Telecommunications Standards Institute. France: European Telecommunications Standards Institute.

Habib, K., & Leister, W. (2015). Threats Identification for the Smart Internet of Things in eHealth and Adaptive Security Measures. 2015 7th International Conference on New Technologies, Mobility and Security (pp. 1-5). Paris: IEEE.

Hamdi, M., & Abie, H. (2014). Game-based adaptive security in the Internet of Things for eHealth. 2014 IEEE International Conference on Communications (ICC) (pp. 920-925). Sydney NSW: IEEE.

Haque, S. A., Aziz, S. M., & Rhaman, M. (2014). Review of Cyber-Physical System in Healthcare. International Journal of Distributed Sensor Networks, 2014, 1-20.

Milenkovic, A., Otto, C., & Jovanov, E. (2006). Wireless sensor networks for personal health monitoring: issues and implementation. Computer Communications, 29(13-14), 2521-2533.

Minoli, D. (2013). Building the internet of Things with IPv6 and MiPv6. Wiley.

Riazul Islam, S. M., Kwak, D., Houssain, M., Kwak, K.-S., & Kabir, M. (2015, June 1). The Internet of Things for Health Care: A Comprehensive Survey. IEEE Access, 3, 678-708.

Sebestyen, G., Hangan, A., Ongia, S., & Gál, Z. (2014). eHealth solutions in the context of Internet of Things. Automation, Quality and Testing, Robotics, 2014 IEEE International Conference on (pp. 1-6). Cluj-Napoca: IEEE.

Wang, J., Adid, H., Lee, S., Shu, L., & Xia, F. (2011). A secured health care application architecture for cyber-physical systems. Control Engineering and Applied Informatics, 13(3), 101-108.
