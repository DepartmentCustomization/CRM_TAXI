---- QUERY HEADER FOR TSQL LINTER----
-- SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- SET ANSI_NULLS ON;
-- SET NOCOUNT ON;
-- SET QUOTED_IDENTIFIER OFF;
---- END HEADER ----
SELECT 
UserId

FROM CRM_TAXI_System.dbo.UserInOrganisation
WHERE OrganisationStructureId = 4
