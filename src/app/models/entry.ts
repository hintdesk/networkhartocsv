
export class Entry {
    constructor(entry: any) {
        let url = entry.request.url;
        this.Name = url.substring(url.lastIndexOf('/') + 1);
        this.Type = this.getType(entry);
        this.Size = this.getSize(entry);
        this.Status = entry.response.status;
        this.CacheControl = this.getCacheControl(entry);
        this.ContentEncoding = this.getResponseHeader(entry, "content-encoding");
        this.ContentLength = this.getContentLength(entry);
        this.Cookies = entry.request.cookies.length;
        this.Domain = this.getDomain(url);
        this.Initiator = this.getInitiator(entry);
        this.LastModified = this.getLastModified(entry);
        this.Method = entry.request.method;
        this.Path = this.getRequestHeader(entry, ":path");
        this.Priority = this.getPriority(entry._priority);
        this.RemoteAddress = entry.serverIPAddress;
        this.Scheme = this.getScheme(entry);
        this.Server = this.getServer(entry);
        this.SetCookies = entry.response.cookies.length;
        this.Time = parseInt(entry.time).toString();
        this.Url = url;
        this.Vary = this.getVary(entry);
    }

    Vary: string;
    Url: string;
    Time: string;
    SetCookies: string;
    Server: string;
    Scheme: string;
    RemoteAddress: string;
    Priority: string;
    Path: string;
    Method: string;
    LastModified: string;
    Name: string;
    Status: number;
    Type: string;
    Initiator: string;
    Cookies: number;
    Size: number;
    CacheControl: string;
    ContentEncoding: string;
    ContentLength: string;
    Domain: string;

    getVary(entry: any) {
        let result = this.getResponseHeader(entry, "vary");
        if (!result) {
            result = this.getResponseHeader(entry, "Vary");
        }
        return result;
    }
    
    getServer(entry: any) {
        let result = this.getResponseHeader(entry, "server");
        if (!result) {
            result = this.getResponseHeader(entry, "Server");
        }
        return result;
    }

    getScheme(entry: any) {
        let result = this.getRequestHeader(entry, ":scheme");
        if (!result) {
            let url = entry.request.url as string;
            if (url.startsWith("https")) {
                result = "https";
            }
            else {
                result = "http";
            }
        }
        return result;
    }

    getLastModified(entry: any) {
        let result = this.getResponseHeader(entry, "last-modified");
        if (!result) {
            result = this.getResponseHeader(entry, "Last-Modified");
        }
        return result;
    }
    getContentLength(entry: any) {
        var result = this.getResponseHeader(entry, "content-length");
        if (!result) {
            result = this.getResponseHeader(entry, "Content-Length");
        }
        return result;
    }

    getCacheControl(entry: any) {
        var result = this.getResponseHeader(entry, "cache-control");
        if (!result) {
            result = this.getResponseHeader(entry, "Cache-Control");
        }
        return result;
    }

    getSize(entry: any) {
        if (entry.response._transferSize) {
            return entry.response._transferSize;
        }
        else {
            return entry.response.content.size;
        }
    }

    getPriority(priority: string) {
        if (priority === "VeryHigh") {
            return "Highest";
        } else if (priority === "VeryLow") {
            return "Lowest";
        }
        else {
            return priority;
        }
    }
    getInitiator(entry: any) {
        if (!entry._initiator) return;
        let initiator = entry._initiator.url;
        if (initiator) {
            return initiator.substring(initiator.lastIndexOf('/') + 1);
        }
        return null;
    }
    getDomain(url: string) {
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
    }

    getRequestHeader(entry: any, header: string) {
        let headers = entry.request.headers;
        for (let index = 0; index < headers.length; index++) {
            if (headers[index].name === header) {
                return headers[index].value;
            }
        }
    }

    getResponseHeader(entry: any, header: string) {
        let headers = entry.response.headers;
        for (let index = 0; index < headers.length; index++) {
            if (headers[index].name === header) {
                return headers[index].value;
            }
        }
    }

    getType(entry: any) {
        if (entry._resourceType && entry._resourceType !== "image" && entry._resourceType !== "other") {
            return entry._resourceType;
        }
        else {
            if (entry.response &&
                entry.response.content &&
                entry.response.content.mimeType) {

                let types = entry.response.content.mimeType.split("/") as string[];
                if (types.length == 1) {
                    return types[0];
                }
                else {
                    return types[types.length - 1];
                }
            }
        }
    }
}