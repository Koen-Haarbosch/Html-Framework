Imports System.IO
Imports System.Net

Namespace Data

    Public Class TwitterFeeder
        Inherits ProcessTrigger.DelayTriggerItem

        Public Sub New(ByVal Identity As String)
            MyBase.New(Identity)
        End Sub

        Protected Overrides Sub Run(ByVal ExecutionStartTime As Date)
            GetData()
        End Sub

        Protected Overrides ReadOnly Property DelayTime() As Integer
            Get
                Return 60 ' 1 minute
            End Get
        End Property

        Private Sub GetData()
            Dim strServiceUrl As String = Aspacts.Idios3.I_CAP.Environment.GetConfigValue("strTwitterServiceUrl", "")
            Dim strContentPath As String = Aspacts.Idios3.I_CAP.Environment.GetConfigValue("strContentPath", "")

            Dim objWebRequest As HttpWebRequest = Nothing
            Dim objWebResponse As System.Net.WebResponse = Nothing
            Dim responseStream As IO.Stream = Nothing
            Dim fileStream As FileStream = Nothing

            Try
                ' Create the request
                Dim objURI As Uri = New Uri(strServiceUrl)
                objWebRequest = CType(HttpWebRequest.Create(objURI), HttpWebRequest)
                objWebRequest.AllowAutoRedirect = True
                objWebRequest.PreAuthenticate = False
                objWebRequest.KeepAlive = False
                objWebRequest.Proxy = Nothing
                objWebRequest.ConnectionGroupName = "NachtNet"
                objWebRequest.Credentials = CredentialCache.DefaultCredentials
                objWebRequest.UserAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Aspacts AutoPress)"
                objWebRequest.Method = "GET"
                objWebResponse = objWebRequest.GetResponse()
                If objWebResponse.ContentLength > 0 Then
                    responseStream = objWebResponse.GetResponseStream()


                    Dim fileInfo As New FileInfo(strContentPath.TrimEnd("\"c) & "\search.json")
                    fileInfo.Delete()
                    fileStream = fileInfo.OpenWrite()
                    Aspacts.Idios3.I_CAP.DataConvert.TransferStream(responseStream, fileStream)
                End If
            Catch ex As Exception
                Aspacts.Idios3.I_CAP.Logging.Log.LogLocal("TwitterFeeder", Aspacts.Idios3.I_CAP.Logging.Log.LogEntryType.Exception, "Error attempting to download Twitter JSON: " & ex.Message)
            Finally
                ' Close everthing
                If Not objWebRequest Is Nothing Then
                    objWebRequest.Abort()
                End If
                If Not objWebResponse Is Nothing Then
                    objWebResponse.Close()
                End If
                If Not responseStream Is Nothing Then
                    responseStream.Close()
                End If
                If Not fileStream Is Nothing Then
                    fileStream.Close()
                End If
            End Try
        End Sub

    End Class


End Namespace