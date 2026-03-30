import type { Bug, BugStatus, Developer, PullRequest } from "./types";

// 2.1 Filter available developers.
export const filterAvailableDevelopers = (developers: Developer[]): Developer[] => {
  return developers.filter((developer) => {
    return developer.disponible;
  });
};

// 2.2 Filter bugs by status.
export const filterBugsByStatus = (bugs: Bug[], status: BugStatus): Bug[] => {
  return bugs.filter((bug) => {
    return bug.estado === status;
  });
};

// 2.3 Get bugs assigned to a developer by id.
export const getBugsByDeveloperId = (bugs: Bug[], developerId: number): Bug[] => {
  return bugs.filter((bug) => {
    return bug.idAsignado === developerId;
  });
};

// 2.4 Get pull requests with no reviewers.
export const getPullRequestsWithoutReviewers = (pullRequests: PullRequest[]): PullRequest[] => {
  return pullRequests.filter((pullRequest) => {
    return pullRequest.revisores.length === 0;
  });
};

// 2.5 Search developers by technology in their stack.
export const findDevelopersByTechnology = (developers: Developer[], technology: string): Developer[] => {
  return developers.filter((developer) => {
    return developer.stack.some((item) => {
      return item.toLowerCase() === technology.toLowerCase();
    });
  });
};

export const trackerFilters = {
  filterAvailableDevelopers,
  filterBugsByStatus,
  getBugsByDeveloperId,
  getPullRequestsWithoutReviewers,
  findDevelopersByTechnology
};
