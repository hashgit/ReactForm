using System.Net.Http;
using System.Net.Http.Headers;

namespace FormApi.Common
{
    public interface IHttpClientFactory
    {
        HttpClient Create();
    }

    public class HttpClientFactory : IHttpClientFactory
    {
        public HttpClient Create()
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.ExpectContinue = false;

            // Note: Some servers do not handle properly the Expect header which might cause timed out errors so disabling this will avoid those issues. In fact this can increase the performance by reducing a round trip.
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            return client;
        }
    }
}