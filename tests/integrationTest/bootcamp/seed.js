module.exports.validCollection = () => {
  return [
    {
      name: "bootcamp1",
      description:
        "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
      website: "https://devcentral.com",
      phone: "(444) 444-4444",
      email: "enroll@devcentral.com",
      address: "45 Upper College Rd Kingston RI 02881",
      careers: [
        "Mobile Development",
        "Web Development",
        "Data Science",
        "Business",
      ],
      housing: false,
      jobAssistance: true,
      jobGuarantee: true,
      acceptGi: true,
    },
    {
      name: "bootcamp2",
      description:
        "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
      website: "https://devcentral.com",
      phone: "(444) 444-4444",
      email: "enroll@devcentral.com",
      address: "45 Upper College Rd Kingston RI 02881",
      careers: [
        "Mobile Development",
        "Web Development",
        "Data Science",
        "Business",
      ],
      housing: false,
      jobAssistance: true,
      jobGuarantee: true,
      acceptGi: true,
    },
  ];
};

module.exports.bootcamp=(obj={})=>{
  return   {
        name: obj.name || 'bootcamp',
        description:obj.description || "Is coding your passion? Codemasters will give you the skills and the tools to become the best developer possible. We specialize in front end and full stack web development",
        website: obj.website || "https://devcentral.com",
        phone: obj.phone|| "(444) 444-4444",
        email: obj.email|| "enroll@devcentral.com",
        address: obj.address|| "45 Upper College Rd Kingston RI 02881",
        careers: obj.careers|| [
            "Mobile Development",
            "Web Development",
            "Data Science",
            "Business",
          ],
          
        housing: obj.housing|| false,
        jobAssistance: obj.jobAssistance|| false,
        jobGuarantee: obj.jobGuarantee|| false,
        acceptGi: obj.acceptGi|| false,
      }
}




