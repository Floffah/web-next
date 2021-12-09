import { stripIndents } from "common-tags";

export const languages = {
    TypeScript: {
        colour: "#3679cd",
        details: stripIndents`
            I am proficient in TypeScript, and it is my go-to language (well, superset) for any new web-based project.
            
            The majority of my projects are written in TypeScript. To name a few, [this website](https://github.com/floffah/web-next), [Collaborated](https://github.com/floffah/collaborated), and many more use TypeScript.
            
            I have experience with a lot of frameworks and libraries including but not limited to: Prisma, React, NextJS, Tailwind CSS 
        `,
    },
    Java: {
        colour: "#b07219",
        details: stripIndents`
            I am proficient in Java. I understand the ideas Java uses and have experience in using technologies including but not limited to Swing/AWT, Sockets, Guava, Lombok, Commons-io, log4j2, Hibernate, and the Bukkit API.
            
            As learning projects I have created several test plugins and implemented my own (incomplete) Minecraft Java Edition server software (using Java sockets and guava byte arrays with a custom packet implementation) which you can see [here](https://github.com/floffah/gamermode-rewrite)
        `,
    },
};
