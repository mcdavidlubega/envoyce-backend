import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

async function main(){
    const mark = await prisma.users.upsert({
        where:{email:'mark@email.com'},
        update:{},
        create:{
            email:'mark@email.com',
            name:'Mark David',
            password:'secretpassword',
            profile:{
                create:{
                    bio:'The chillest one of them all.'
                }
            },
            invoices:{
                create:[{
                    title:'Invoice 1',
                    terms:'Invoice due in 30 minutes',
                    items:{
                        create:[
                            {
                            description:'Item 1 description', 
                            quantity:2,    
                            unit_cost:1000   
                        },
                        {
                            description:'Item 2 description', 
                            quantity:1,    
                            unit_cost:200   
                        },
                        {
                            description:'Item 3 description', 
                            quantity:3,    
                            unit_cost:3500   
                        },
                        {
                            description:'Item 4 description', 
                            quantity:4,    
                            unit_cost:500   
                        }
                        ],
                    },
                    client:{
                        create:{
                            email: 'info@shirtcat.com',
                            name:'Shirtcat Carpentry', 
                            address:'Kigundu Road Kitalanga, Kampala',
                            tel:'256 789 826 6434',
                        }
                    },

                }],
            }
        }
    })
    const timo = await prisma.users.upsert({
        where:{email:'timo@email.com'},
        update:{},
        create:{
            email:'timo@email.com',
            name:'Timothy Ssali',
            password:'secretpassword',
            profile:{
                create:{
                    bio:'The coolest one of them all.'
                }
            },
            invoices:{
                create:[{
                    title:'Invoice 2',
                    terms:'Invoice due in 30 minutes',
                    items:{
                        create:[
                            {
                            description:'Item 1 description', 
                            quantity:2,    
                            unit_cost:1000   
                        },
                        {
                            description:'Item 2 description', 
                            quantity:1,    
                            unit_cost:200   
                        },
                        {
                            description:'Item 4 description', 
                            quantity:4,    
                            unit_cost:500   
                        }
                        ],
                    },
                    client:{
                        create:{
                            email: 'info@aic.com',
                            name:'Agro Consortium Ltd', 
                            address:'1 Vale, Naguru Hill, Kampala',
                            tel:'256 789 8146 6443',
                        }
                    },

                }],
            }
        }
    })
    const isaac = await prisma.users.upsert({
        where:{email:'isaac@email.com'},
        update:{},
        create:{
            email:'isaac@email.com',
            name:'Isaac Mukasa',
            password:'secretpassword',
            profile:{
                create:{
                    bio:'The wisest one of them all.'
                }
            },
            invoices:{
                create:[{
                    title:'Invoice 3',
                    terms:'Invoice due in 30 minutes',
                    items:{
                        create:[
                            {
                            description:'Item 1 description', 
                            quantity:2,    
                            unit_cost:1000   
                        },
                        {
                            description:'Item 2 description', 
                            quantity:1,    
                            unit_cost:200   
                        },
                        {
                            description:'Item 3 description', 
                            quantity:4,    
                            unit_cost:500   
                        },
                        {
                            description:'Item 4 description', 
                            quantity:2,    
                            unit_cost:1500   
                        },
                        {
                            description:'Item 5 description', 
                            quantity:1,    
                            unit_cost:5000   
                        },
                        {
                            description:'Item 6 description', 
                            quantity:2,    
                            unit_cost:300   
                        }
                        ],
                    },
                    client:{
                        create:{
                            email: 'info@ctb.com',
                            name:'Created To Build', 
                            address:'1 Katalina, Kampala',
                            tel:'256 789 8146 6443',
                        }
                    },

                }],
            }
        }
    })
    

    console.log({mark,})
}

main().then(async ()=>{
    await prisma.$disconnect()
}).catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})