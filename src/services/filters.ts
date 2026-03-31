import type { Bug, BugStatus, Developer, PullRequest } from "../models";

// 2.1
export const filterAvailableDevelopers = (developers: Developer[]): Developer[] => {
  return developers.filter((developer) => {
    return developer.disponible;
  });
};

// 2.2
export const filterBugsByStatus = (bugs: Bug[], status: BugStatus): Bug[] => {
  return bugs.filter((bug) => {
    return bug.estado === status;
  });
};

// 2.3
export const getBugsByDeveloperId = (bugs: Bug[], developerId: number): Bug[] => {
  return bugs.filter((bug) => {
    return bug.idAsignado === developerId;
  });
};

// 2.4
export const getPullRequestsWithoutReviewers = (pullRequests: PullRequest[]): PullRequest[] => {
  return pullRequests.filter((pullRequest) => {
    return pullRequest.revisores.length === 0;
  });
};

// 2.5
export const findDevelopersByTechnology = (developers: Developer[], technology: string): Developer[] => {
  return developers.filter((developer) => {
    return developer.stack.some((item) => {
      return item.toLowerCase() === technology.toLowerCase();
    });
  });
};
