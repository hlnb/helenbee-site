---
title: CSS Grid, My first coding experiment
date: 2018-07-24
image: /img/wp-content/uploads/2018/07/Screen-Shot-2018-07-24-at-12.39.55-pm-1.png
excerpt: My journey into learning CSS Grid and how it helped me understand web layouts better.
---

This is an experiment in using Grid CSS, that was used in a production site. The client wanted a visual representation of the work they do as a big jigsaw with links to the various programs the client is doing. The instruction was along the line of "we have many parts that fit together like a jigsaw".

Whilst I have not created individual jigsaw pieces I have created a grid layout that is representative of that idea. I decided on how many rows I needed as well as columns. I then used grid positioned according to whether the z-index is either higher or lower than one it is overlaid/underlaid. Sort of a weave.

The images titles were created to be links. As it is navigation I used an unordered list with each list element containing a figure element. This figure element contained a figcaption element for the link as well as an image element representing the content of the section/part.

This was my first time using Grid CSS, and it was interesting. It did allow me to have control over where each of the figure elements were placed and it provides flexibility when using units that are flexible in nature, such as fr units, ems, rems, etc.

Thanks to Jen Simmons and her wonderful labs [https://labs.jensimmons.com/](https://labs.jensimmons.com/) that showed me the way to actually place the items and have them overlap.

I am sure that I could simplify this grid, however I am happy with the way it turned out and even better the client is happy.

<iframe height="450" style="width: 100%;" scrolling="no" title="CSS Grid Experiment" src="//codepen.io/anon/embed/VdreQK?height=450&theme-id=1&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/anon/pen/VdreQK'>CSS Grid Experiment</a>
</iframe>
