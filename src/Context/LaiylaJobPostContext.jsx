import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useConversation } from "@11labs/react";
import { fetchTranscript } from '../webhooks/apiService';
import { toast, ToastContainer } from 'react-toastify';

const JobContext = createContext();



export const JobProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState("");
  const [dataCollection, setDataCollection] = useState();
  const conversation = useConversation();
  const [throughLaiyla, setThroughLaiyla] = useState(false);

  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const [jobPost, setJobPost] = useState({
    jobTitle: '',
    designation: '',
    jobType: '',
    workplaceType: '',
    jobDescription: '',
    mainSkills: [],
    subSkills: [],
    salaryRange: {},
    benefits: [],
    jobPortalsPosting: [],
  });

  const [jobCards, setJobCards] = useState([
    {
      jobTitle: "Sales Manager",
      postId: "1a2b3c4d",
      postedOn: new Date("2024-12-12").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      progress: {
        jobPosted: 0,
        applicantsApplied: 0,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
      companyName: "Amazon",
      role: "Sales Manager",
      detail: ["Full-time", "On-site", "Healthcare Benefits"],
      skills: ["Sales", "Team Management", "Communication"],
      currentStatus: {
        "Candidates Applied": 0,
        "Completed Interview": 0,
      },
    },
    {
      jobTitle: "Data Scientist",
      postId: "2b3c4d5e",
      postedOn: new Date("2024-12-12").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      progress: {
        jobPosted: 1,
        applicantsApplied: 0,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
      companyName: "Amazon",
      role: "Data Scientist",
      detail: ["Full-time", "Remote", "Stock Options"],
      skills: ["Python", "Machine Learning", "Statistics"],
      currentStatus: {
        "Candidates Applied": 0,
        "Completed Interview": 0,
      },
    },
    {
      jobTitle: "AI Engineer",
      postId: "3c4d5e6f",
      postedOn: new Date("2024-12-12").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      progress: {
        jobPosted: 1,
        applicantsApplied: 1301,
        selectionComplete: 0,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
      companyName: "Amazon",
      role: "AI Engineer",
      detail: ["Contract", "Hybrid", "Travel Allowance"],
      skills: ["TensorFlow", "Deep Learning", "Python"],
      currentStatus: {
        "Candidates Applied": 1301,
        "Completed Interview": 0,
      },
    },
    {
      jobTitle: "Marketing Manager",
      postId: "4d5e6f7g",
      postedOn: new Date("2024-12-12").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 0,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
      companyName: "Amazon",
      role: "Marketing Manager",
      detail: ["Full-time", "On-site", "Bonus Opportunities"],
      skills: ["SEO", "Digital Marketing", "Content Strategy"],
      currentStatus: {
        "Candidates Applied": 1278,
        "Completed Interview": 0,
      },
    },
    {
      jobTitle: "Sr. Account Manager",
      postId: "5e6f7g8h",
      postedOn: new Date("2024-12-12").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 1,
        aiTechnicalRound: 0,
        shortlistedCandidates: 0,
      },
      companyName: "Amazon",
      role: "Sr. Account Manager",
      detail: ["Full-time", "Hybrid", "Healthcare Benefits"],
      skills: ["Accounting", "Negotiation", "CRM Software"],
      currentStatus: {
        "Candidates Applied": 1278,
        "Completed Interview": 0,
      },
    },
    {
      jobTitle: "Software Developer",
      postId: "6f7g8h9i",
      postedOn: new Date("2024-12-12").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      progress: {
        jobPosted: 1,
        applicantsApplied: 1278,
        selectionComplete: 1,
        aiInterviewRound: 1,
        aiTechnicalRound: 1,
        shortlistedCandidates: 0,
      },
      companyName: "Amazon",
      role: "Software Developer",
      detail: ["Full-time", "Remote", "Flexible Hours"],
      skills: ["JavaScript", "React", "Node.js"],
      currentStatus: {
        "Candidates Applied": 1278,
        "Completed Interview": 0,
      },
    },
  ]);

  const postJobCard = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL
        }/api/alljobsposted/upload_job_posted_laiyla`,
        jobPost
      );

      if (response.status === 200) {
        toast.success("Job post uploaded.");

        setJobPost({
          jobTitle: "",
          designation: "",
          jobType: "",
          workplaceType: "",
          jobDescription: "",
          mainSkills: [],
          subSkills: [],
          salaryRange: {},
          benefits: [],
          jobPortalsPosting: [],
        });
        // Optionally, close the dialog after saving
        fetchJobPosts();
      }
    } catch (error) {
      console.error("Error saving job post:", error);
      // toast.error("Failed to save job post. Please try again.");
    }
  };

  const fetchJobPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/alljobsposted/jobs_posted`);

      if (response.status === 200) {

        const jobs = response.data;
        const jobData = [];
        // Transform fetched data into jobCards format

        jobs.forEach((job) => {
          jobData.push({
            jobTitle: capitalizeWords(job.jobTitle),
            postId: job._id,
            postedOn: new Date(job.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
            progress: job.Progress,
            companyName: job.companyName || "Amazon",
            detail: [
              job.jobType,
              job.workplaceType,
              ...(job.benefits || []),
            ],
            skills: job.mainSkills,
            currentStatus: {
              "Candidates Applied": 0,
              "Completed Interview": 0,
            },
          });
        });

        // Update the state only if `jobData` contains items
        if (jobData.length) {
          setJobCards(jobData);
        }
      }
    } catch (error) {
      console.error('Error fetching job posts:', error);
    }
  };

  const handleGenerateDescription = async (title, position) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/generate_job_description",
        {
          job_title: title,
          position: position,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false, // Ensure credentials are not included (if not needed)
        }
      );

      const data = res.data;

      if (res) {
        const response = {
          jobDescription: data.job_description || "",
          mainSkills: data.main_skills || [],
          subSkills: data.sub_skills || [],
        };

        setJobPost((prev) => ({ ...prev, ...response }));
        setThroughLaiyla(true);
      }
    } catch (error) {
      console.error("Error fetching job description:", error);
    }
  };

  const getTranscriptData = async () => {
    try {
      // Call fetchTranscript and wait for the promise to resolve
      const data = await fetchTranscript(conversationId); // Replace with actual conversation ID
      setDataCollection(data?.analysis.data_collection_results); // Store the data in the state

      if (
        data?.analysis.data_collection_results?.["Job title"]?.value &&
        data?.analysis.data_collection_results?.["Designation"]?.value
      ) {
        handleGenerateDescription(
          data?.analysis.data_collection_results?.["Job title"]?.value,
          data?.analysis.data_collection_results?.["Designation"]?.value
        );
      }
    } catch (error) {
      console.error("Error fetching transcript data:", error);
    }
  };

  return (
    <JobContext.Provider value={{
      jobCards, setJobCards, fetchJobPosts, dataCollection, setDataCollection,
      fetchTranscript, conversationId, setConversationId, conversation, jobPost, setJobPost,
      handleGenerateDescription, getTranscriptData, throughLaiyla, setThroughLaiyla, postJobCard,
      capitalizeWords
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => useContext(JobContext);
