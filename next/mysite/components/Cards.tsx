import React from 'react';
import MyCard from './myCard';

const myProjects = [
    {
        title: 'Blog',
        description: "Let's make something new here.",
        content: 'This is the content of the Blog card. It includes information about blogging.',
    },
    {
        title: 'Engineering',
        description: 'Here stuffs related to engineering is available',
        content: 'This card contains information about engineering projects and ideas.',
    },
    {
        title: 'Market',
        description: 'I will try creating a demo market here',
        content: 'Explore various market trends and analytics in this section.',
    },
    {
        title: 'Learning Platform',
        description: 'Various Courses are going to be available here.',
        content: 'Courses on various subjects will be offered here, stay tuned!',
    },
    {
        title: 'Web3',
        description: 'Projects related to web3 will be here.',
        content: 'Courses on various subjects will be offered here, stay tuned!',
    },
    {
        title: 'Others',
        description: 'Projects related to web3 will be here.',
        content: 'Courses on various subjects will be offered here, stay tuned!',
    }
];

const Cards = () => {
    return (
        <div className='grid grid-cols-2 h-dvh gap-5 mx-20 mb-10 md:grid-cols-3 '>
            {myProjects.map((project, index) => (
                <MyCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    content={project.content}
                />
            ))}
        </div>
    );
};

export default Cards;
