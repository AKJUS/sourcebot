import { NewsItem } from "./types";

export const newsData: NewsItem[] = [
    {
        unique_id: "structured-logging",
        header: "Structured logging",
        sub_header: "We've added support for structured logging",
        url: "https://docs.sourcebot.dev/docs/configuration/structured-logging"
    },
    {
        unique_id: "code-nav",
        header: "Code navigation",
        sub_header: "Built in go-to definition and find references",
        url: "https://docs.sourcebot.dev/docs/features/code-navigation"
    },
    {
        unique_id: "sso",
        header: "SSO",
        sub_header: "We've added support for SSO providers",
        url: "https://docs.sourcebot.dev/docs/configuration/auth/overview",
    },
    {
        unique_id: "search-contexts",
        header: "Search contexts",
        sub_header: "Filter searches by groups of repos",
        url: "https://docs.sourcebot.dev/docs/features/search/search-contexts"
    }
]; 