using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using FormApi.Common;
using FormApi.Models;
using FormApi.Services;
using FormApi.Services.Models;
using FormApi.Settings;
using Microsoft.Extensions.Options;
using Moq;
using Newtonsoft.Json;
using Xunit;

namespace FormApi.Tests
{
    public class FormServiceTests
    {
        // a sample unit test

        [Fact]
        public async Task CanSendData()
        {
            var clientFactoryMock = new Mock<IHttpClientFactory>();
            var expected = new { _id =  Guid.NewGuid().ToString()};

            var configuration = new HttpConfiguration();

            var clientHandlerStub = new DelegatingHandlerStub((request, cancellationToken) => {
                request.SetConfiguration(configuration);
                var response = request.CreateResponse(HttpStatusCode.OK, expected);
                return Task.FromResult(response);
            });
            var client = new HttpClient(clientHandlerStub);

            clientFactoryMock.Setup(_ => _.Create()).Returns(client);

            var service = new FormService(Options.Create(new ApiOptions
            {
                ServiceAuthKey = "authKey",
                ServiceUrl = "http://serviceUrl"
            }), clientFactoryMock.Object);

            var form = new Form
            {
                Data = new FormValues
                {
                    FirstName = "My",
                    LastName = "Name",
                    Email = "name@my.com",
                    MobilePhone = "044444444"
                }
            };

            var result = await service.SubmitAsync(form);

            Assert.Equal(expected._id, result);

            clientFactoryMock.Verify(x => x.Create(), Times.Once);
        }
    }
}
