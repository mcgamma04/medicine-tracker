import {PrismaClient} from "@prisma/client"

import * as fs from "fs"
import * as path from "path"

const prisma = new PrismaClient();

async function main() {
    const usersData = JSON.parse(fs.readFileSync(path.resolve(__dirname,"userData.json"),"utf-8"));
    for(const userData of usersData){
        await prisma.user.upsert({
            where: {email: userData.email},
            update: {},
            create:{
                email: userData.email,
                name:userData.name,
                password:userData.password,
                role:userData.role,
                Medicine:{
                    create:userData.Medicine.map((medicineData:any) => ({
                        name:medicineData.name,
                        description:medicineData.description,
                        verificationCode:medicineData.verificationCode,
                        manufactureDate:medicineData.manufactureDate,
                        expirationDate:medicineData.expirationDate,

                    }))
                }
            }
        })
    }
}

main()
    .then(async () =>{
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
