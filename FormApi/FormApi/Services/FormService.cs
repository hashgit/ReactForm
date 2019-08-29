using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FormApi.Models;
using FormApi.Services.Models;
using FormApi.Settings;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using IHttpClientFactory = FormApi.Common.IHttpClientFactory;

namespace FormApi.Services
{
    public interface IFormService
    {
        Task<string> SubmitAsync(Form formValues);
    }

    public class FormService : IFormService
    {
        private readonly ApiOptions _apiOptions;
        private readonly IHttpClientFactory _httpClientFactory;

        public FormService(IOptions<ApiOptions> apiOptions, IHttpClientFactory httpClientFactory)
        {
            _apiOptions = apiOptions.Value;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<string> SubmitAsync(Form formValues)
        {
            var content = JsonConvert.SerializeObject(formValues, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() });

            var requestMessage = new HttpRequestMessage
            {
                RequestUri = new Uri(_apiOptions.ServiceUrl),
                Method = HttpMethod.Post,
                Headers = {{"x-auth", _apiOptions.ServiceAuthKey}},
                Content = new StringContent(content, Encoding.UTF8, "application/json")
            };

            var client = _httpClientFactory.Create();
            var response = await client.SendAsync(requestMessage);

            if (!response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                var error = JsonConvert.DeserializeObject<ServiceError>(result);

                // log error
                throw new ApplicationException("Failed to send data to service");
            }
            else
            {
                var result = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<ServiceResponse>(result);

                return data._id;
            }
        }
    }
}